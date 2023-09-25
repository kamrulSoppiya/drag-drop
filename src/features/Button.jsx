// eslint-disable-next-line react/prop-types
export default function Button({buttonType,children,styleClass, ...rest}) {
  return (
    <div>
        <button type={buttonType} className={styleClass} {...rest}>{children}</button>
    </div>
  )
}
