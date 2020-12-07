
// import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../contexts/AuthContext"
// import { Link, useHistory } from "react-router-dom"

// export default function SignUp() {
//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const passwordConfirmRef = useRef()
//     const { signup } = useAuth()
//     const [error, setError] = useState("")
//     const [loading, setLoading] = useState(false)
//     const history = useHistory()

//     async function handleSubmit(e) {
//         e.preventDefault()

//         if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//             return setError("Passwords do not match")
//         }

//         try {
//             setError("")
//             setLoading(true)
//             await signup(emailRef.current.value, passwordRef.current.value)
//             history.push("/")
//         } catch {
//             setError("Failed to create an account")
//         }

//         setLoading(false)
//     }


//     return (
//         <>
//             <Card>
//                 <Card.Body>
//                     <h2 className="SignUp">Sign Up</h2>
//                     {error && <Alert variant="danger">{error}</Alert>}
//                     <form onSubmit={handleSubmit}>
//                         <label id="email">
//                             <h3>Email</h3>
//                             <input type="email" ref={emailRef} required />
//                         </label>
//                         <label id="password">
//                             <h4>Password</h4>
//                             <input type="password" ref={passwordRef} required />
//                         </label>
//                         <label id="password-confirm">
//                             <h5>Password Confirmation</h5>
//                             <input type="password" ref={passwordConfirmRef} required />
//                         </label>
//                         <Button disabled={loading} className="w-100" type="submit">
//                             Sign Up
//             </Button>
//                     </form>
//                 </Card.Body>
//             </Card>
//             <div className="w-100 text-center mt-2">
//                 Already have an account? <Link to="/login">Log In</Link>
//             </div>
//         </>
//     )
// }