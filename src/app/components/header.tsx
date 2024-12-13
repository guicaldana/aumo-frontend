export const Header = () =>{

    return(
        <header className="flex bg-[var(--header-background)] py-4">
            <h1 className="flex gap-2 px-20">users_like.me</h1>
            <nav className="flex gap-20  items-end justify-end">
                <a href="#" className="text-[var(--header-text)]">Following</a>
            </nav>
        </header>
    );
};