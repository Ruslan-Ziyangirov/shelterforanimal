import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import "./SkeletonNewsPage.sass"

export const SkeletonNewsPage = () =>{
    return(
        <div className="skeleton-wrapper">
            <div className="header-skeleton">
                <h1>
                    <Skeleton width={217} height={46} duration={1} />
                </h1>
            </div>
            <div className="news-list-skeleton">
                <div className="news-wrapper-skeleton">
                    <div className="img-skeleton">
                        <Skeleton width={384} height={256} duration={1} borderRadius={20} />
                    </div>
                    <div>
                        <p>
                            <Skeleton width={166} height={33} duration={1} />
                        </p>
                        <p>
                            <Skeleton width={650} height={100} duration={1} />
                        </p>
                        <p>
                            <Skeleton width={144} height={13} duration={1} />
                        </p>
                    </div>
                </div>
                <div className="news-wrapper-skeleton">
                    <div className="img-skeleton">
                        <Skeleton width={384} height={256} duration={1} borderRadius={20} />
                    </div>
                    <div>
                        <p>
                            <Skeleton width={166} height={33} duration={1} />
                        </p>
                        <p>
                            <Skeleton width={650} height={100} duration={1} />
                        </p>
                        <p>
                            <Skeleton width={144} height={13} duration={1} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}