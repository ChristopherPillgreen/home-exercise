
interface NotificationProps extends React.PropsWithChildren {
  message?: string | null;
  bgcolor: string;
}

export default function CustomNotification({
  message,
  bgcolor,
  children,
}: NotificationProps) {
  if (message)
    return (
    <div className={`fixed top-5 right-5 z-50 bg-${bgcolor} text-white px-6 py-3 rounded-lg  shadow-lg transition-opacity duration-300`}>
        {message}
    </div>
    );
  return <>{children}</>;
}