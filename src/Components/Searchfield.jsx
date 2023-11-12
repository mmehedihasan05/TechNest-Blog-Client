// import Autocomplete from "@mui/joy/Autocomplete";
// import Input from "@mui/joy/Input";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useEffect } from "react";

const Searchfield = ({ handleSearch, categories }) => {
    const [label, setLabel] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        if (selectedCategories.length > 0) {
            setLabel("Categories");
        } else {
            setLabel("Showing from all categories");
        }

        console.log(selectedCategories);
    }, [selectedCategories]);

    return (
        <div>
            <form
                action=""
                onSubmit={(event) => {
                    handleSearch({ event, searchTitle, selectedCategories });
                }}
                className="allBlogs-search "
            >
                <div className="flex flex-col gap-4">
                    <TextField
                        id="outlined-search"
                        label="Search by title…"
                        type="search"
                        className="p-4"
                        onChange={(e) => {
                            setSearchTitle(e.target.value);
                        }}
                    />
                    <Autocomplete
                        // filterSelectedOptions
                        multiple
                        id="tags-outlined"
                        options={categories}
                        renderInput={(params) => (
                            <TextField {...params} label={label} placeholder="Categories" />
                        )}
                        getOptionLabel={(option) => option.title}
                        getOptionValue={(option) => option.value} // specify how to get the value
                        onChange={(event, values, xx, option) => {
                            setSelectedCategories(values);
                        }}
                        value={selectedCategories}
                    />
                    <input type="submit" className="_btn _btn-secondary w-[20%]" value="Search" />
                </div>
            </form>
        </div>
    );
};

export default Searchfield;
