import Razorpay from "Razorpay";

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_fQm1HYzuyjnkOe",
    key_secret: "lPcWib3K2lTVE7iGw5U0b8DC"
});

export const createOrderController = async (req, res) => {
    try {
        const amount = req.body.amount*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:RAZORPAY_ID_KEY,
                        product_name:req.body.name,
                        description:req.body.description,
                        contact:"9910101788",
                        name: "Alvin S T",
                        email: "alvinst2005@gmail.com"
                    });
                }
                else{
                    res.status(400).send({ success: false, msg: 'Something went wrong!', error: err });
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
};