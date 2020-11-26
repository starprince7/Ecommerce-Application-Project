const express = require('express')
const stripe = require('stripe')('sk_test_51Hr8foLLQ44ySXdyc7FuVESxWc52uMGOLktJN1ZBZlqOBYGEg7aZHSPa4JLtnQ93JPr8rc5swXWST6yu5qES4GoM00InGBNbyg')

const app = express()


const log = console.log
const port = process.env.PORT || 4000

app.use(express.urlencoded())
app.use(express.json())



// Serving Static files to the Client
if (process.env.NODE_ENV === "production") {
    // Make the Client files Public
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      console.log("req just came in to load up React client/Build files ");
      res.sendFile("./client/build/index.html", { root: __dirname });
    });
  }



app.listen(port, function () {
    log(`Server started on port ${port}`)
})

app.post('/api/charges', async (req, res) => {
    log("Reg Came In!!!")
    const { amount, id } = req.body
    console.log('The amount and id  ===================', amount, id)
    
    try { 
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'NGN'
        })
        log('Transcation Success Msg: ===', paymentIntent)
        res && res.status(200).send(paymentIntent.client_secret)
    }
    catch (err) {
        log('Error making Payment! =================', err.code)
        res.send(err.raw)
    }
})