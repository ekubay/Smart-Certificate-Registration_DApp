// React Front end Interaction with the Smart Contract
const connectAlgoSigner = async () => {
    let resp = await AlgoSigner.connect()
        console.log(resp)
        getUserAccount()
        // if()
  }

  const getUserAccount = async () =>{
    userAccount.current =  await AlgoSigner.accounts({
         ledger: 'TestNet'
       })
 // console.log(userAccount.current[0]['address'])
 console.log(userAccount.current)

 }
 let client = new algosdk.Algodv2(CONSTANTS.algodToken, CONSTANTS.baseServer, CONSTANTS.port)

 //OPTIN
// create unsigned transaction
const Optin = async (sender, index) => {
  try{
    let params = await client.getTransactionParams().do()
    params.fee = 1000;
    params.flatFee = true;

    let txn = algosdk.makeApplicationOptInTxn(sender, params, index);
    // sign, send, await
    // Sign the transaction

    const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    let signedTxs  = await AlgoSigner.signTxn([{txn: txn_b64}])
     console.log(signedTxs)

     // Get the base64 encoded signed transaction and convert it to binary
   let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);

    // Send the transaction through the SDK client
   let txId = await client.sendRawTransaction(binarySignedTx).do();
       console.log(id)

    // Wait for transaction to be confirmed
    const confirmedTxn = await algosdk.waitForConfirmation(client, txId, 4);
     console.log("confirmed" + confirmedTxn)

    // Get the completed Transaction
    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    // display results
     let transactionResponse = await client.pendingTransactionInformation(txId).do();
     console.log("Opted-in to app-id:",transactionResponse['txn']['txn']['apid'])
  }catch(err){
    console.log(err)
  }
}