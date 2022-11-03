import { Icon, IconProps } from '@chakra-ui/react'

export const OrderListIcon: React.FC<IconProps> = ({ ...props }) => (
  <Icon viewBox="0 0 18 18" {...props}>
    <path
      d="M1.875 12H3.375V12.375H2.625V13.125H3.375V13.5H1.875V14.25H4.125V11.25H1.875V12ZM2.625 6.75H3.375V3.75H1.875V4.5H2.625V6.75ZM1.875 8.25H3.225L1.875 9.825V10.5H4.125V9.75H2.775L4.125 8.175V7.5H1.875V8.25ZM5.625 4.5V6H16.125V4.5H5.625ZM5.625 13.5H16.125V12H5.625V13.5ZM5.625 9.75H16.125V8.25H5.625V9.75Z"
      fill="currentColor"
    />
  </Icon>
)
