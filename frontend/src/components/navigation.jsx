function Navigation() {
    return (
        <div className="navbar bg-neutral">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><a>Item 1</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;