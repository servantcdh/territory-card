import React, { useCallback, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import S13Layout from "../../components/templates/S-13Layout";
import { s13Api } from "../../hooks/api/record";
import { docxS13Api } from "../../hooks/api/file";

const S13Page = () => {
  const [serviceYear, setServiceYear] = useState("");
  const results = useQueries({
    queries: [
      {
        queryKey: [`s-13/${serviceYear}`, serviceYear],
        queryFn: s13Api,
        enabled: !!serviceYear,
        refetchOnMount: "always",
      },
    ],
  });
  const onServiceYearSelectHandler = useCallback(
    (serviceYear) => {
      setServiceYear(serviceYear);
    },
    [setServiceYear]
  );
  const onDownloadClickHandler = useCallback(() => {
    docxS13Api(serviceYear);
  }, [serviceYear]);
  const { data: s13Data } = results[0];
  const s13 = s13Data ? s13Data : [];
  return (
    <S13Layout
      s13Data={s13}
      onServiceYearSelect={onServiceYearSelectHandler}
      onDownload={onDownloadClickHandler}
    />
  );
};

export default S13Page;
