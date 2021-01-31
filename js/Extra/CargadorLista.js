class CargadorLista {
  constructor(numItems, funcionSalida) {
    this.funcionSalida = funcionSalida;
    this.numItems = numItems;
    this.numItemsListos = 0;
    this.funcionReportarItem = () => {
      this.numItemsListos++;
      if (this.numItemsListos == this.numItems) {
        this.funcionSalida();
      }
    };
  }
}
