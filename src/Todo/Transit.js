class Transit{
    constructor(from, to, exportMoney ){
        this.from = from;
        this.to = to;
        this.exportMoney = exportMoney;
        this.createdat = new Date();
    }
}

module.exports = Transit;