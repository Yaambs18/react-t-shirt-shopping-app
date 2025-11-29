import "./Tshirt.css"

const Tshirt = (props) => {
    console.log('prop', props)
    return (
        <li className="tshirt">
            <span className="name">{props.name}</span>
            <p className="description">{props.description}</p>
            <select className="size">
                {props.sizes.map(
                    size => <option key={size}>{size}</option>
                )}
            </select>
            <span className="price">{props.price}</span>
            <button className="add-to-cart">Add to Cart</button>
        </li>
    )
}

export default Tshirt;
