import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import "./SheltersProfilePage.sass"

export const SkeletonProfilePage = () =>{
    return(
        <div className="skeleton-wrapper">
            <div className="header-profile-skeleton">
                <h1>
                    <Skeleton width={355} height={46} duration={1} />
                </h1>
            </div>
            <div className="profile-wrapper-skeleton">
                <div className="profile-information-skeleton">
                    <div className="img-profile-skeleton">
                        <Skeleton width={128} height={128} duration={1} borderRadius={100}/>
                    </div>
                    <div className="additional-profile-skeleton">
                        <Skeleton width={100} height={16} duration={1}/>
                        <Skeleton width={120} height={16} duration={1}/>
                        <Skeleton width={140} height={16} duration={1}/>
                    </div>

                    <div className="buttons-skeleton">
                        <Skeleton width={372} height={54} borderRadius={50} duration={1}/>
                        <div className="mini-button">
                            <Skeleton width={100} height={39} borderRadius={50} duration={1}/>
                        </div>
                    </div>
                </div>

                <div className="visit-history-skeleton">
                    <div>
                        <Skeleton width={600} height={26} duration={1}/>
                    </div>
                    <div className="visit-card-wrapper">
                        <div>
                            <h5><Skeleton width={133} height={21} duration={1}/></h5>
                            <p><Skeleton width={80} height={16} duration={1}/></p>
                        </div>

                        <div className="date">
                            <h5><Skeleton width={133} height={21} duration={1}/></h5>
                            <p><Skeleton width={80} height={16} duration={1}/></p>
                        </div>

                        <div className="charity">
                            <h5><Skeleton width={133} height={21} duration={1}/></h5>
                            <p><Skeleton width={80} height={16} duration={1}/></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}