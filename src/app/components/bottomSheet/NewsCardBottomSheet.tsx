import { BottomSheet } from "react-spring-bottom-sheet/dist";
import {FC, useEffect, useState} from "react";
import "react-spring-bottom-sheet/dist/style.css";
import {ButtonMedium} from "../ui/buttons/medium/ButtonMedium";
import {Icon} from "../cards/shelterCard/ShelterCard";
import "./NewsCardBottomSheet.sass"

interface Props {
    description: any;
    date: any;
    isOpen: boolean;
}

export const NewsCardBottomSheet: FC<Props> = ({ description, date , isOpen}) => {
    const [open, setOpen] = useState<boolean>(isOpen);

    useEffect(()=>{
        setOpen(isOpen)
    }, [isOpen]);

    return (

        <BottomSheet
            className=""
            open={open}
            blocking={false}
            scrollLocking={false}
            snapPoints={({ headerHeight, maxHeight }) => [
                headerHeight,
                (maxHeight - 56) * 0.65,
                maxHeight - 56
            ]}
            onDismiss={()=> {
                setOpen(false)
                isOpen=false
            }}
            header={
                <h2>Описание</h2>
            }
            footer={
                <div className="footer-bottom-sheet">
                    <ButtonMedium
                        type={"button"}
                        onClick={()=>setOpen(false)}
                        title={"Закрыть"}
                        color={"white"}
                        background={"#713EDD"}
                    />
                </div>
            }
        >
            <div className="description-bottom-sheet">
                <p>
                    {description}
                </p>

                <div className="date-wrapper">
                    <Icon name="calendar" height="24" width="24"/>
                    <p>{date}</p>
                </div>
            </div>
        </BottomSheet>

    );
};