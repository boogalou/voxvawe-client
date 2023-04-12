import { ChangeEvent, DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from "react";
import cnBind from "classnames/bind";
import styles from "./textarea.module.scss"

const cx = cnBind.bind(styles);
export interface TextareaProps extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  className?: string;
  name?: string;
  rows: number;
  type?: string;
  error?: string;
  value?: string;
  onChange?: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = forwardRef(({ className, name, type, rows, value, onChange, ...restProps }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
      <textarea
          className={cx("textarea", className)}
          name={name}
          ref={ref}
          rows={rows}
          value={value}
          onChange={onChange}
          {...restProps}
      >

      </textarea>
  );
})