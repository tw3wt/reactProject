import { Movie } from "../../../models/types";

class WishlistService {
  private wishlist: Movie[] = [];

  constructor() {
    this.loadWishlist();
  }

  // 로컬 스토리지에서 위시리스트 로드
  private loadWishlist(): void {
    const storedWishlist = localStorage.getItem("movieWishlist");
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  // 로컬 스토리지에 위시리스트 저장
  private saveWishlist(): void {
    localStorage.setItem("movieWishlist", JSON.stringify(this.wishlist));
  }

  // 위시리스트에 영화 추가/제거
  toggleWishlist(movie: Movie): void {
    const index = this.wishlist.findIndex((item) => item.id === movie.id);

    if (index === -1) {
      // 영화가 위시리스트에 없으면 추가
      this.wishlist.push(movie);
    } else {
      // 영화가 이미 위시리스트에 있으면 제거
      this.wishlist = this.wishlist.filter((item) => item.id !== movie.id);
    }

    this.saveWishlist();
  }

  // 위시리스트에 특정 영화가 있는지 확인
  isInWishlist(movieId: number): boolean {
    return this.wishlist.some((item) => item.id === movieId);
  }

  // 현재 위시리스트 가져오기
  getCurrentWishlist(): Movie[] {
    return [...this.wishlist];
  }
}

// Singleton 인스턴스 내보내기
export default new WishlistService();
