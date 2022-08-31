import React from 'react';
import ErrorBoundary from "./ErrorBoundary";
const UserApp = React.lazy(() => import('user/UserApp'));

const RemoteComponentWrapper = ({ children }) => (
    <div
        style={{
            border: "1px ",
            background: "#194dab",
            color: "white"
        }}
    >
        <ErrorBoundary>{children}</ErrorBoundary>
    </div>
);

export const App = () => (
    <div
        style={{
            border: "1px",
            background: "#e6b254"
        }}>
        <h1>Container application</h1>
        <RemoteComponentWrapper>
            <UserApp />
        </RemoteComponentWrapper>
    </div >
)

export default App;