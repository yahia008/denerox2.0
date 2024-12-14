const Transaction = require('../model/transaction')

exports.transactionHistory = async(req, res)=>{
    const { id: transactionId } = req.params;
    try{
        const transactions = await Transaction.find({ account:transactionId}).sort({ createdAt: -1 });
        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found' });
        }
       
         res.status(200).json(
        {msg:"transaction history",
            transactions
        })
    }catch(error){
        res.status(404).json({
            message:error.message
        })
}

}


exports.getTransactionById = async (req, res) => {
    const { id: transactionId } = req.params; // Extract transactionId from the URL params
    try {
        // Find a single transaction by its unique ID
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({
            msg: 'Transaction retrieved successfully',
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the transaction',
            error: error.message,
        });
    }
};

