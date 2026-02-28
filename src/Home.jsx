import { Button } from "./components/Button"    
export const Home = () => {

    const [count, setCount] = useState(0);//estado para el contador

    return (
        <div>  
            <h1>Home Component</h1>
            <p>Welcome to the Home page of our React application!</p>
            <Button 
                classes="btn btn-primary" 
                id="homeButton" 
                dataToggle="button" 
                type="button" 
                text="Click Me" 
            />  
            <Button
                classes="btn btn-secondary"
                id="infoButton"
                dataToggle="button"
                type="button"
                text="More Info"
            />
            <Button 
                classes="btn btn-success" 
                id="submitButton" 
                dataToggle="button" 
                type="submit" 
                text="Submit" 
            />
        </div>
    )
}