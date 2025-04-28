
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, User, Book, MessageSquare, Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/dataService";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = getCurrentUser();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-6 w-6 text-primary" />
          <span className="hidden font-serif text-xl font-bold sm:inline-block">
            BookBazaar
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar livros..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" variant="ghost" className="ml-2">
            Buscar
          </Button>
        </form>

        <div className="flex items-center space-x-2">
          <Link to="/new-book">
            <Button variant="ghost" size="icon" className="hidden md:flex" title="Adicionar livro">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="ghost" size="icon" title="Mensagens">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Meus livros</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/new-book">Vender livro</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/messages">Mensagens</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
