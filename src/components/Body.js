import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filtedListOfRestaurants, setFiltedListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState('');

    const topRatedRestaurant=()=>{
        const filteredData = listOfRestaurants.filter((res) =>
            res.info.avgRating > 4
        );
        setFiltedListOfRestaurants(filteredData);
    };

    const searchedRestaurant=()=>{
        const filteredData = listOfRestaurants.filter((res) =>
            res.info.name.toLowerCase().includes(searchText.toLowerCase()));
        setFiltedListOfRestaurants(filteredData);
    };

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () =>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFiltedListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };


    return listOfRestaurants.length === 0 ? (<Shimmer/>) : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-text" value={searchText} onChange={(e)=>{setSearchText(e?.target?.value)}}/>
                    <button className="search-button" onClick={()=>{searchedRestaurant()}}>Search</button>
                </div>
                <button className="filter-btn" onClick={()=>{topRatedRestaurant()}}>Top Rated Restaurants</button>
            </div>
            <div className="res-container">
               {filtedListOfRestaurants.map((res)=>(
                <RestaurantCard key={res.info.id} resData={res}/>
               ))}
            </div>
        </div>
    );
};

export default Body;