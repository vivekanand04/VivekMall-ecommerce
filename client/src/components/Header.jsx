import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp  } from "react-icons/go";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state)=> state?.user)
    const [openUserMenu,setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    // const [totalPrice,setTotalPrice] = useState(0)
    // const [totalQty,setTotalQty] = useState(0)
    const { totalPrice, totalQty} = useGlobalContext()
    const [openCartSection,setOpenCartSection] = useState(false)
 
    const redirectToLoginPage = ()=>{
        navigate("/login")
    }

    const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }

    //total item and total price
    // useEffect(()=>{
    //     const qty = cartItem.reduce((preve,curr)=>{
    //         return preve + curr.quantity
    //     },0)
    //     setTotalQty(qty)
        
    //     const tPrice = cartItem.reduce((preve,curr)=>{
    //         return preve + (curr.productId.price * curr.quantity)
    //     },0)
    //     setTotalPrice(tPrice)

    // },[cartItem])

  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
        {
            !(isSearchPage && isMobile) && (
                <div className='container mx-auto flex items-center px-2 justify-between'>
                                {/**logo */}
                                {/* <div className='h-full'>
                                    <Link to={"/"} className='h-full flex justify-center items-center'>
                                        <img 
                                            src={logo}
                                            width={170}
                                            height={60}
                                            alt='logo'
                                            className='hidden lg:block'
                                        />
                                        <img 
                                            src={logo}
                                            width={120}
                                            height={60}
                                            alt='logo'
                                            className='lg:hidden'
                                        />
                                    </Link>
                                </div> */}
                                  <div className='h-full'>
  <Link to={"/"} className='h-full flex items-center gap-2 '>
    <img 
   
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABXFBMVEX5+fn+UBP5///8URTzaDP/Sw4AAAD7URf6SQD3lH3////5+fr4+vj6+Pn8/Pz/UBD/SAD0///4/f/7+fX7+Pj5RAAAAAj4TADv////QAD+Thb3UxX2+/b6UhD7+f/0RACsrKxhYWEpKSnn5+fDw8MdHR3U1NT0mHcAABPzVBT1/PL99///Shv51cjsbTzx//X439W4uLg0NDSYmJiKiopPT0+np6d4eHhDQ0N1dXXt7e3a2toVFRU6OjpnZ2eQkJAUByLrnIjbjGvTfmeWY1Y2LSXqkXTvk2jzwrDYQga9QBkWAADoRBXyiWfSRh3aShXjRyXRUCqjOiJ7LRWRPCAoBgXoVyP0t5306uE9FginPB1uLBhPHQ+8SCE2EA36SSjx6NXs17fus5PuelLxrJz2urDxxan6iXnzqYf2XTncYSbyeUHy4L/yY0Tw89zzu5v8eGT1mo/jglj3zsdTD3L2AAALvUlEQVR4nO2cj3ejxhHHBUiAYdHCLmskWCD3Kz6QkXVJ88tp0zptbTU5JW3aWLRpGjn4XDuJ79rL//9eF1uyJUCXNLUD9dvPu+e7J6Tn/WpmZ2eG4VotDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofDWYumtXa7mtatex23hdZ9cu+N+2/ce21Xq3spt4P28JE8583uHTRjV/sFk/bW209eu8f+vv/g7pmx+44sv/s624Oa9oD9U3541yTmFnyvdemb3Qt/fXK3JGpPZPmd682nPbgvy6/fJYndB7J8r7UUXbTdR/Kj3TsUbrS3inq095nmu2NE7WF522mv3aWtyEz4bskju/fkX94VN+2+XnU4dJmfvn1HjMhOikcVUrT35Ps//2JuhzfkNysUXpj2TvhpruT9KiXar+QP7oSbam/KcqUQ7e07ciZqH8jvVSrM84A74abGu5XbkKE9kn/9/+amFFmWuAIVd38jP+xRsQTtae+wjWiVr1gAgLqVrIPubW0U2PpwU/5t6dXLS7+Tf79fcelgjHDdStagY9801QJ/2Nx8qpZeZZjmR5sfP3XKF8ikuQpHqiIoK0jeJ5vy06jwao7vwU9l+Y9++Yo01GndUtaAxqbrCyvA6NPH8lMoCSWg1znc3PwEli/40W5jFZ6qbkGLKzAb/gm6ZYXs2mey/Gel4oIzauohImZOWeFfZPnzwyp98FCW5SojuiRBdUupBBhiuyzE+3zz48eflWUIHnz6WN58/FH5ikSmYt1iqgB6K/XYLiqsNvrr5qb8N7+sA7rSF5vy36u8VD1tpA1pICaqVFQowC//8fEXUadCoQKVL7/8yqtQ6GR63WqqiAfWlJQU+q5w+OlXfoWlPKgIEPoVMcj1zoy61VQRxOKWWVotk8yQKk6Lyy+g6kVFcFKg642zo0G7WVnhT0ERwhFoNU8hDtKzipD5E5AEMhYbqDAOZqUw8xMVSmSPKaxbUIl4cETWbbf/FnXSw83Lvin6+sYUwjbAQeNqREPcUm9IIIuxNrAbpxBbQ2f9kqXIz48NJbeyq3ie0PErT4r5u8ksaJ5CuhtVZWDzJQvb24rbMU1ygarCaNuV1gem/lGAG6cQjMLKGmnudo7jHGZbx8+efX/y4nQrOySq72+vfbt5bOHGBVNj3F9rQ2iG2fEoBZaILolnyd6QOGuN6PyzZzcucxNZ+VuhDfqC5IRbo1hEANjzY5ylZIEIkpdhRxLcYkmZow4baEM0qVLouoJDDmYopq2CTWzRQskwhL7nlj8HI0SbplCPzxylbA3PUQ8TarXKjRcEMLWM07BT5apSmIKmeakeE7+k0BUgOYgDywbBoJXHxksvvfiBdWQbSEy+MYXyF6P0E9QsG4IWSkK/uFKoeOEpDZaMYQOMdQyWSng0a5u+VNyLXv+kWTmNYet03C9ZkIWYsR0s2wK3AGBn+dLicS9tm9ArbkXztNsohS0b4b2+V3Q3Lzy2Aju+Wqre7aGuSK0guP4ksnuzbzrFUn/bybRG9WpYVBCzzkrLRWLHBDndGdBWbkQjAGw7Ph9vZcNv96cjK2C+iy/OA4qwmLjFPo4bncWN2odggC2v2GWTzAnW59bSaWvw3aSvsnSt0++H50cB040XG9T6OvSLCrefB2t/XQ2AAU1JIcp46mHaG1jzd1BwGjqRxHRLnu87ZJIGCNjzi6I9LDXj1KOGKYyTfkGhG44tfeFq3VlGIhZ6clwGNIczrC8U6iwQFz697YwbtQ913JsWSifYyYBuXBzbFKM0r6zmnngZjtTzVFykAXpstR1he8lTXV89tV71G39uDCxOCgq9frKIoSDYyRxYvP/UyYJFnwLY4ov+yt0b1+9MGtXZN2i3XWwFt3tXjRb9awJh8SiRSLKwEggQ9tXlM5EpPAdNCqaGhYuhtP8MLxQaz1moLGVmEjPi4g0oDjJz+bBxffcsbZJCGnynriqE4fOrSGFNrw70PNJc/lR8Jbw+8nRxz1n2UujBaDagzUlrQHBSqGY7w+v6DmROZ0lhnp+zcNoxw9G1lcQxWVGodEiCbLvyt9VCwQQsr9wKFj1dnbY78zDJvgWomqpD+qHfzo6XOqJoRJa9lIUdcmwZDWqZslC6vNEkwXyBrhTaZ33SzyFh6Eft/b3jcZJiVgEvFY36KFzpgbCsfUM0mnM7HxjnnaXTDCow97GFD/bScTJOkmTEZGliL6aWiIo36vXUcVf8XFIz0GrOPmylnruqMBwhvAg1dpCDkAgwWzQOdKO8v1BKVvtYEmzjBlX5+oxswxWFTnqtkMY0/8PqfFboG4ZRdWsQnfRXa0QWklK9OZEGTclyypIr3LWumta6zUQZBsu+Qd7HAAAgphHQC4Bt28DAdFhqLTI3aM4+FPdVqKwqTK1XtOUxI+8oDlgRhWjM6vxJOa0jJw1SCLIVhQKLNCMarIn1OqslGJR2u5ZI4zhNxluOWk7rzNOgMQq7uA1XFbLzWrxSmG88ALpdUcxb3l3mq3Y6Ssbj6d4ka0chO0lMRZJ8v+Cm5KApCgECqVO0gDm9TrytGKe7uabp8d7+JBu2PScMQ2Iy1A5c29lXz3bqlLWEcVnAFhTuW1eBkG5Eh05I5qJMh30dMHfKtRMa893sPW/IcaHji0GaggGG3atY3xsTqCgXgvLhyvxOhe/70g8plMJZQ8p8g1rlQRoYplf70MYRs5l7sVHhpVdCwZ3bUHGh1FGqxjMlMm5ImW/3WCgtrY9MrcW5rovTUFEqb09IEowUNXIrxzPN44YobIE0Ki/fGfauClxqHfTdYqicK5T6h8nIq5puY3u5IbGUDoqdxBwlHC3aENjC+ENSNcHGahBnf9eixdrr8iJke7leaQuCcb+8PgFmvRhcDMWwn4hOPWcRXKQ8zOQj4FANXyYUGLHRdmFpcEHy/Ib0vQ00rVAoCU4i2vai5z2wZv8K8xlpd1txXRZQoe8QMkms/CYatY/65ek+yQ8b0qoxxEnFxJ4C1Xa6Ey/i/Y4x6CUvo77p+I6jslORhMMXz62A5mYKYjHruMWszXfDhkxD69Zh1e1t6JkTES+iTQAsVtTH4+Ps/Kw9zLaeJVhEA0wv7/QOWFYkFbMbf9uZNkNhEJM1mRc57dnG9e2JvH2P5k/+rBT5Nh1YE7N4nkiKudULmnCjFCUVofTCjEp/r7eDg8Jmwrj4WBMa7HwfqaVZFVfNVm411oY4rYr1uRHciPw7Rj88vhWIx/mXVAw1HS+iIGhAbmptrFEoKNtO/2WKsIFsHVVZg8VaO7bRbBKy+FrK3KAXpq3ikEodWNk6hYyIPD3p5S0au2pOzaIxHYhH3/RL9/EvnYDMjAYMneg0qhrFn8PKCPJtgqzqkGEHgTHL+h0YrVE4Rkb9kaabht76QUpFYtUD+XY8E1HJS3Vk4ZOXxIz8yrQ075meWoP6c1OUmBWzUMvrFKBKzg5OZpSKgY7Ei54GOzXw7GjrnOTDNLAcZS4xM4vW76Xo2Y96BsEkUjs7HY+TZMT4fnx8MPQIMcvp6DKdc9AAheKkU/3w3QpQULw8X1PzrI0RhmqHpS2vGKK9+FSUNmCgXRwqP0IhO/59xd12L5F8z5NY0iIpr36AAQqzunumMcK7XqnTeXOEiVVzUkMDMCp1Em8Q9ViseR8CG41LncQbxNkQay4RdYz2bu4piwqFmVjziT+gqKr8vTFgG9ccS22EhzfzONca/LRegS0czCoboTeFotb94DpGR2vK3xtSaNY9wIfRya0qlNS9mhVSbetWFQrOpGYvBeClemuHoZA/8nZWr0A9Ng5fWRz8rygs9673yAepc6sKJXd5+K0OUELWdzBuAN8lNQdTa2pKt4m/TY4tvc7Erbdhup1bxdygeo0PzOp4cta+ZfZxrX1vJGpa+b8ju1G6tdqwZVOQz6ndJi1Q6z7kcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDg/O/8BSxdRNcbOifoAAAAASUVORK5CYII="
      width={50}
      height={50}
      alt='logo'
      className='object-contain rounded-full'
    />
    <span className='text-2xl font-bold text-blue-600'>VivekMall</span>
  </Link>
</div>


                                {/**Search */}
                                <div className='hidden lg:block'>
                                    <Search/>
                                </div>


                                {/**login and my cart */}
                                <div className=''>
                                    {/**user icons display in only mobile version**/}
                                    <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                        <FaRegCircleUser size={26}/>
                                    </button>

                                      {/**Desktop**/}
                                    <div className='hidden lg:flex  items-center gap-10'>
                                        {
                                            user?._id ? (
                                                <div className='relative'>
                                                    <div onClick={()=>setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                                                        <p>Account</p>
                                                        {
                                                            openUserMenu ? (
                                                                  <GoTriangleUp size={25}/> 
                                                            ) : (
                                                                <GoTriangleDown size={25}/>
                                                            )
                                                        }
                                                       
                                                    </div>
                                                    {
                                                        openUserMenu && (
                                                            <div className='absolute right-0 top-12'>
                                                                <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                                    <UserMenu close={handleCloseUserMenu}/>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                </div>
                                            ) : (
                                                <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                                            )
                                        }
                                        <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                            {/**add to card icons */}
                                            <div className='animate-bounce'>
                                                <BsCart4 size={26}/>
                                            </div>
                                            <div className='font-semibold text-sm'>
                                                {
                                                    cartItem[0] ? (
                                                        <div>
                                                            <p>{totalQty} Items</p>
                                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                        </div>
                                                    ) : (
                                                        <p>My Cart</p>
                                                    )
                                                }
                                            </div>    
                                        </button>
                                    </div>
                                </div>
                </div>
            )
        }
        
        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>

        {
            openCartSection && (
                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
        }
    </header>
  )
}

export default Header
