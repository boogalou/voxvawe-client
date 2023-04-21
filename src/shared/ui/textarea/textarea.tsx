import {ChangeEvent, DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, ReactNode} from "react";
import cnBind from "classnames/bind";
import styles from "./textarea.module.scss"

const cx = cnBind.bind(styles);

export interface TextareaProps extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    className?: string;
    onChange?: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
    rows?: number;
}

export const Textarea = forwardRef((
    {
        className,
        onChange,
        value,
        rows,
        ...restProps
    }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <textarea
            className={cx("textarea", className)}
            ref={ref}
            onChange={onChange}
            value={value}
            rows={rows}
            {...restProps}
        >

        </textarea>
    );
})