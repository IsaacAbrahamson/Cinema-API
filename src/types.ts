// Reserved tickets are tickets that are stored in the database
// Active tickets are currently in the cart
// Chosen tickets are selected but not added to cart
export interface ITicket {
  showingId: number,
  seat: string,
  reserved: boolean,
  active: boolean,
  chosen: boolean
  id?: number,
}

export interface ICart {
  ticket: ITicket
  movie: any
}