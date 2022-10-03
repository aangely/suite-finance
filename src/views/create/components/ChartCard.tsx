import { Box, Flex, Image, Text, useTheme, VStack } from "@chakra-ui/react";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { color } from "highcharts/highstock";

import { Card } from "@app/components/Card";
import { useChartData } from "@app/hooks/useChartData";
import { useReceiveStore } from "@app/store/useReceiveStore";
import { useSellStore } from "@app/store/useSellStore";
import { formatPrice } from "@app/utils/format";

import type { Token } from "@app/store/useSellStore";

export const Chart = ({ token, symbol, data }: { token: Token; symbol: string; data: [number, number][] }) => {
  const { colors } = useTheme();

  const startColor = colors.purple[100];
  const endColor = "rgba(255, 255, 255, 0.05)";
  const lineColor = colors.purple[300];

  const options: Highcharts.Options = {
    chart: {
      animation: false,
      backgroundColor: "transparent",
    },
    plotOptions: {
      area: {
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, startColor],
            [0.95, endColor],
          ],
        },
        lineColor,
        threshold: null,
        lineWidth: 1.5,
      },
    },
    tooltip: {
      backgroundColor: colors.gray[50],
      borderColor: colors.gray[50],
      borderRadius: 4,
      split: false,
      useHTML: true,
      headerFormat: "<div>{point.key}</div>",
      pointFormatter: function (this: { y?: number }) {
        return `<div>Current Price: 1 (${token.symbol || ""}) = <b>${formatPrice(this?.y ?? 0)} ${symbol}</b></div>`;
      },
      footerFormat: "",
    },
    yAxis: {
      opposite: false,
      showFirstLabel: false,
      showLastLabel: true,
      zIndex: 200,
      gridLineColor: colors.gray[100],
      gridLineWidth: 1,
      labels: {
        align: "right",
        x: 0,
        style: { color: "gray.900" },
      },
    },
    xAxis: {
      labels: {
        style: { color: "gray.900" },
      },
    },
    navigator: {
      adaptToUpdatedData: false,
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 545,
          },
        },
      ],
    },
    time: {
      useUTC: false,
    },
    series: [
      {
        type: "area",
        data,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Box minHeight="400px" pos="relative">
      <Flex position="absolute" alignItems="center">
        <Image src={token.icon} alt={token.name} width="28px" height="28px" />
        <Text color="black" marginLeft="2">
          {token.symbol}
        </Text>
      </Flex>
      <Box width="100%" pos="relative" marginTop="50px">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="stockChart"
          options={options}
          containerProps={{
            style: {
              zIndex: 1,
              position: "relative",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export const ChartCard = () => {
  const token = useSellStore((state) => state.token);
  const tokens = useReceiveStore((state) => state.tokens);
  const data =
    useChartData(
      token.slug,
      tokens.map((t) => t.slug),
    ) || [];

  return (
    <VStack spacing="30px">
      {data.map(({ slug, data }) => {
        const targetToken = tokens.find((t) => t.slug === slug)!;
        return (
          <Card key={slug} background="white">
            <Chart token={targetToken} symbol={token.symbol} data={data.prices} />
          </Card>
        );
      })}
    </VStack>
  );
};
