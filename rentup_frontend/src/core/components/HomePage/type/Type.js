import Heading from "../../common/Heading/Heading"
import TypeCard from "./TypeCard"
import classes from "./Type.module.css"
import {useState, useEffect} from "react"
import {getAllCategory} from "../../../../api/CategoryApi"

const typeData = [
    {
        text: "Family House",
        img: "https://funny-daffodil-350bc9.netlify.app/images/hero/h1.png",
        value: 0
    },
    {
        text: "House & Villa",
        img: "https://funny-daffodil-350bc9.netlify.app/images/hero/h2.png",
        value: 1
    },
    {
        text: "Apartment",
        img: "https://funny-daffodil-350bc9.netlify.app/images/hero/h3.png",
        value: 2
    },
    {
        text: "Office & Studio",
        img: "https://funny-daffodil-350bc9.netlify.app/images/hero/h4.png",
        value: 3
    },
    {
        text: "Villa & Condo",
        img: "https://funny-daffodil-350bc9.netlify.app/images/hero/h6.png",
        value: 4
    },
    
]

const Type = (props) => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        getAllCategory()
        .then((data) => {
            const temp = []
            data.forEach(data => {
                temp.push({
                    text: data.name,
                    img: data.image,
                    value: data.id,
                })
            })
            setData(temp)
        })
        .catch((err) => {
            alert(err.message);
        });
    }, [])
    
    return (
        <section className={`${classes.featured} ${classes.featuredBackground}`}>
            <div className={classes.container}>
                <Heading title='Featured Property Types' subtitle='Find All Type of Property.' />
                <div className={`${classes.grid5} ${classes.mtop}`}>
                    {data.map((items, index) => <TypeCard item={items} index={index} handleFilter={props.handleFilter}/>)}
                </div>
            </div>
        </section>
    )
}

export default Type