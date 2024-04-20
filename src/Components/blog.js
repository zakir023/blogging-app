//Blogging App with Firebase
import { useState, useRef, useEffect } from "react";

//Import fireStore reference from frebaseInit file
import { db } from "../firebaseInit";

//Import all the required functions from fireStore
import { collection, doc, addDoc, setDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";

export default function Blog() {

    const [formData, setformData] = useState({ title: "", content: "" })
    const [blogs, setBlogs] = useState([]);

    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus()
    }, []);

    // fetch the all docements from data base

    useEffect(() => {
        //   async function fetchData(){
        //         //  perform the operation here
        //         const snapshot=await getDocs(collection(db,"blogs"));
        //         console.log(snapshot);
        //         const blogs=snapshot.docs.map((doc)=>{
        //             return{
        //                 id:doc.id,
        //                 ...doc.data()
        //             }

        //         })
        //         console.log(blogs);
        //         setBlogs(blogs);
        //   }
        //   fetchData();

        const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
            const blogs = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }

            })
            console.log(blogs);
            setBlogs(blogs);

        })
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        titleRef.current.focus();
        setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);

        /** Add a new document with an auto generated id. */

        // await addDoc(collection(db,"blogs"),{
        //     title:formData.title,
        //     content:formData.content,
        //     createdOn:new Date()
        // })

        //addDoc either this way

        const docRef = doc(collection(db, "blogs"));
        await setDoc(docRef, {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
        });

        /*********************************************************************** */

        setformData({ title: "", content: "" });
    }


    async function removeBlog(id) {

        // setBlogs(blogs.filter((blog, index) => index !== i));
        // datavbase se humko document ko dlete karna hai 
        // jis bhi document ko delete karna hai us blog ki id dalo 
        const docRef=doc(db,"blogs",id);
        await deleteDoc(docRef);

    }

    return (
        <>
            <h1>Write a Blog!</h1>
            <div className="section">

                {/* Form for to write the blog */}
                <form onSubmit={handleSubmit}>
                    <Row label="Title">
                        <input className="input"
                            placeholder="Enter the Title of the Blog here.."
                            ref={titleRef}
                            value={formData.title}
                            onChange={(e) => setformData({ title: e.target.value, content: formData.content })}
                        />
                    </Row >

                    <Row label="Content">
                        <textarea className="input content"
                            placeholder="Content of the Blog goes here.."
                            required
                            value={formData.content}
                            onChange={(e) => setformData({ title: formData.title, content: e.target.value })}
                        />
                    </Row >

                    <button className="btn">ADD</button>
                </form>

            </div>

            <hr />

            {/* Section where submitted blogs will be displayed */}
            <h2> Blogs </h2>
            {blogs.map((blog, i) => (
                <div className="blog" key={i}>
                    <h3>{blog.title}</h3>
                    <hr />
                    <p>{blog.content}</p>

                    <div className="blog-btn">
                        <button onClick={() => {
                            removeBlog(blog.id)
                        }}
                            className="btn remove">

                            Delete

                        </button>
                    </div>
                </div>
            ))}

        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}




// import { type } from "@testing-library/user-event/dist/type";
// import { useEffect, useReducer, useRef, useState } from "react";
// import { db } from "../firebaseInit"
// function blogsReducer(state, action) {
//     switch (action.type) {
//         case "ADD":
//             return [action.blog, ...state];
//         case "REMOVE":
//             return state.filter((blog, index) => index !== action.index);
//         default:
//             return [];
//     }
// }

// //Blogging App using Hooks
// export default function Blog() {

//     // const [title,setTitle]=useState("");
//     // const [content,setContent]=useState("");
//     // title aur content 2 alag alag state hai
//     // mai chaheta hun isko ek state me combine kar
//     // useState ke anadar ek object pass kar diya fhir usme title aur content ko dal diya empty srting

//     const [formData, setFormData] = useState({ title: "", content: "" })
//     // add the blogs
//     // const [blogs, setBlogs] = useState([]);
//     const [blogs, dispatch] = useReducer(blogsReducer, [])
//     /*mai chaheta hun mera focus title pe rahe  uske liye hum user karte useRef*/
//     const titleRef = useRef(null);
//     useEffect(() => {
//         titleRef.current.focus()
//     }, [])

//     useEffect(() => {
//         if (blogs.length && blogs[0].title) {
//             document.title = blogs[0].title;
//         }
//         else {
//             document.title = "No blogs!"
//         }
//     }, [blogs])

//     //Passing the synthetic event as argument to stop refreshing the page on submit
//     function handleSubmit(e) {
//         e.preventDefault();
//         // when i click the add then blogs populated with title and content both so we can save the title and component inside the object
//         // setblogs({title,content})
//         // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);  //rest Operator ...
//         // ... rest oprator ko jab mai bad me dalta hun to jo kuch hum change kar rahe hain title aur content me oh humko top pe dikhta hai
//         // aur jab pahle use karte hain rest operator ka to oh humko bottom pe change dikhta hai
//         dispatch({ type: "ADD", blog: { title: formData.title, content: formData.content } })
//         setFormData({ title: "", content: "" })
//         titleRef.current.focus();
//         console.log(blogs);
//     }



//     function removeBlog(i) {
//         // setBlogs(blogs.filter((blog, index) => i !== index));
//         dispatch({ type: "REMOVE", index: i })
//     }

//     return (
//         <>
//             {/* Heading of the page */}
//             <h1>Write a Blog!</h1>

//             {/* Division created to provide styling of section to the form */}
//             <div className="section">

//                 {/* Form for to write the blog */}
//                 <form onSubmit={handleSubmit}>

//                     {/* Row component to create a row for first input field */}
//                     <Row label="Title">
//                         <input className="input"
//                             placeholder="Enter the Title of the Blog here.."
//                             value={formData.title}
//                             ref={titleRef}
//                             onChange={(e) => { setFormData({ title: e.target.value, content: formData.content }) }} />
//                     </Row >

//                     {/* Row component to create a row for Text area field */}
//                     <Row label="Content">
//                         <textarea className="input content"
//                             placeholder="Content of the Blog goes here.."
//                             value={formData.content}
//                             required
//                             onChange={(e) => { setFormData({ title: formData.title, content: e.target.value }) }} />
//                     </Row >

//                     {/* Button to submit the blog */}
//                     <button className="btn">ADD</button>
//                 </form>

//             </div>

//             <hr />

//             {/* Section where submitted blogs will be displayed */}
//             <h2> Blogs </h2>
//             {/* <h3>{title}</h3>
//           <p>{content}</p> */}

//             {blogs.map((blog, i) => (
//                 <div className="blog" key={i}>
//                     <h3>{blog.title}</h3>
//                     <p>{blog.content}</p>
//                     <div className="blog-btn">
//                         <button onClick={() => removeBlog(i)} className="btn remove">
//                             Delete
//                         </button>
//                     </div>
//                 </div>


//             ))}

//         </>
//     )
// }

// //Row component to introduce a new row section in the form
// function Row(props) {
//     const { label } = props;
//     return (
//         <>
//             <label>{label}<br /></label>
//             {props.children}
//             <hr />
//         </>
//     )
// }
