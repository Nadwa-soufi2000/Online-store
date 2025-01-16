import Skeleton from "react-loading-skeleton";

export default function SkeletonComponent(props)
{
    return(
        <div style={{width : props.size , height : props.long}}>
            <Skeleton className="w-full h-full"/>
        </div>
    )
}