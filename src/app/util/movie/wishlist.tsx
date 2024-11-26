import { Movie } from "../../../models/types";

export const WishlistService = {
  wishlist: [] as Movie[],

  loadWishlist(): void {
    const storedWishlist = localStorage.getItem("movieWishlist");
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  },

  saveWishlist(): void {
    localStorage.setItem("movieWishlist", JSON.stringify(this.wishlist));
  },

  toggleWishlist(movie: Movie): void {
    const index = this.wishlist.findIndex((item) => item.id === movie.id);

    if (index === -1) {
      this.wishlist.push(movie);
    } else {
      this.wishlist = this.wishlist.filter((item) => item.id !== movie.id);
    }

    this.saveWishlist();
  },

  isInWishlist(movieId: number): boolean {
    return this.wishlist.some((item) => item.id === movieId);
  },

  getCurrentWishlist(): Movie[] {
    return [...this.wishlist];
  },
};

export default WishlistService;