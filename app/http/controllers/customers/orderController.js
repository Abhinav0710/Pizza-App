const Order = require('../../../models/order')
const moment = require('moment')
function orderController () {
    return {
        store(req, res) {
             // Validate request
             const { phone, address  } = req.body
             if(!phone || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
             }
// Order coming from the page
             const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
          order.save().then(result=>{
            Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                req.flash('success','Order placed successfully')
             delete req.session.cart
              // Emit
              const eventEmitter = req.app.get('eventEmitter')
              eventEmitter.emit('orderPlaced', placedOrder)

             return res.redirect('/customer/orders')
            })
          }).catch(err=>{
              req.flash('error','Something went wrong')
              return res.redirect('/cart')
          })
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } } )
                //No cache
            res.header('Cache-Control', 'no-store')
            //Being sent to front end basically so that it can be used to show the data
            res.render('customers/orders', { orders: orders, moment: moment })
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id)
            // Authorize user so that we don't allow other users to check orders
            //Can't compare two objects so converted to string
            if(req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order })
            }
            return  res.redirect('/')
        }
    }
}

module.exports = orderController