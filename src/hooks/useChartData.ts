import useSWR from "swr";

const getUrl = (slug: string) => `https://price-api.crypto.com/price/v2/w/${slug}`;

type TimePrice = [number, number];

const getRecentTimePrice = (prices: TimePrice[], index: number): TimePrice => {
  if (prices[index]) return prices[index];
  return prices[prices.length - 1];
};

const getTimeKey = (time: number) => {
  const date = new Date(time * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString();
  return `${year}-${month}-${day}-${hour}`;
};

function constructPriceChartData({
  prices,
  calculatePrice,
}: {
  prices: TimePrice[];
  calculatePrice: (timePrice: TimePrice, index: number) => number;
}) {
  const rawPrices = prices;

  let lastNotNullPrice = 0;
  const transformedPrices: Array<[number, number]> = rawPrices.map(([time, price], index) => {
    const newPrice = price === null ? lastNotNullPrice : calculatePrice([time, price], index);
    if (newPrice !== null) {
      lastNotNullPrice = newPrice;
    }
    return [time, newPrice];
  });

  return {
    prices: transformedPrices,
  };
}

export const useChartData = (sellSlug: string, receiveSlugs: string[]) => {
  const fetchSell = () => fetch(getUrl(sellSlug), { method: "get" }).then((r) => r.json());
  const fetchReceive = () =>
    Promise.all(
      receiveSlugs.map((slug) =>
        fetch(getUrl(slug), { method: "get" })
          .then((r) => r.json())
          .then((r) => ({ slug: slug, data: r })),
      ),
    );
  const { data: sellData } = useSWR<{ prices: TimePrice[] }>(sellSlug, fetchSell);
  const { data: receiveData } = useSWR<Array<{ slug: string; data: { prices: TimePrice[]; price_change: number } }>>(
    "_" + receiveSlugs.sort().join(",") + "_",
    fetchReceive,
  );
  const currentCurrencyUSDPriceObject: {
    [t: string]: { time: string; price: number };
  } = {};
  sellData?.prices?.forEach((timePrice) => {
    const time = getTimeKey(timePrice[0]);
    currentCurrencyUSDPriceObject[time] = { time, price: timePrice[1] };
  });
  console.log(currentCurrencyUSDPriceObject, sellData?.prices);
  return receiveData?.map(({ slug, data: { prices, price_change } }) => ({
    slug,
    price_change,
    data: constructPriceChartData({
      prices,
      calculatePrice: ([time, price], index) =>
        price / currentCurrencyUSDPriceObject[getTimeKey(time)]?.price || getRecentTimePrice(sellData?.prices || [], index)?.[1] || 1,
    }),
  }));
};
