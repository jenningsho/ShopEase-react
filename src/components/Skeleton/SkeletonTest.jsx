import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTest = () => {
    return (
        <div>
            <h1>Chargement des données...</h1>
            <Skeleton height={200} width="100%" />
            <Skeleton height={20} width="80%" />
            <Skeleton height={20} width="60%" />
            <Skeleton height={40} width="50%" />
        </div>
    );
};

export default SkeletonTest;
