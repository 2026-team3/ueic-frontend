import react from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";

export default function MyStudiesPage(){
    return(
        <div className="my-studies-list-page">
            <Header />
            <div className="menu-bar">
                <NavigationBar />
            </div>
        </div>
    );
}