import { Circles } from "react-loader-spinner";

const DataLoading = () => {
    return (
        <div>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default DataLoading;
