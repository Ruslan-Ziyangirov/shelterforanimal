import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import "./SkeletonSheltersPage.sass"

export const SkeletonSheltersPage = () =>{
    return(
        <div className="skeleton-wrapper">
            <div className="header-skeleton">
                <h1>
                    <Skeleton width={355} height={46} duration={1} />
                </h1>
            </div>
            <div className="shelters-list-skeleton">
                <div className="shelter-wrapper-skeleton">
                    <div className="img-skeleton">
                        <Skeleton width={262} height={175} duration={1} borderRadius={20} />
                    </div>
                    <div>
                        <p>
                            <Skeleton width={166} height={33} duration={1} />
                        </p>
                        <p>
                            <Skeleton width={527} height={67} duration={1} />
                        </p>
                        <p>
                            <Skeleton width={144} height={13} duration={1} />
                        </p>
                    </div>
                    <div>
                        <Skeleton width={171} height={25} duration={1} />
                    </div>
                </div>
                <div className="shelter-wrapper-skeleton">
                    <div className="img-skeleton">
                        <Skeleton width={262} height={175} duration={1} borderRadius={20} />
                    </div>
                    <div>
                        <p>
                            <Skeleton width={166} height={33} duration={1} />
                        </p>
                        <p>
                            <Skeleton width={527} height={67} duration={1} />
                        </p>
                        <p>
                            <Skeleton width={144} height={13} duration={1} />
                        </p>
                    </div>
                    <div>
                        <Skeleton width={171} height={25} duration={1} />
                    </div>
                </div>
            </div>
        </div>
    )
}

