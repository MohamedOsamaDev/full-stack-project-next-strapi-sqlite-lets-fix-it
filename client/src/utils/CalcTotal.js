const CalcTotal = (products, data, Tax) => {
    let total = 0.00;
    products?.forEach((e) => {
      const Product = data?.find((p) => p?.id === e?.id);
      total +=
        +e.quantity *
        (+Product?.price - +Product?.price * (+Product?.discount / 100));
    });
    if (Tax) {
      let Taxs = total * (Tax / 100);
      total += Taxs;
    }
    return +total.toFixed(2);
  };
  export default CalcTotal;
  