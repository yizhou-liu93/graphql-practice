import { gql } from 'apollo-boost';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  getCartTotal,
  getCartItemCount
} from './cart.utils';

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }


  extend type Mutation {
    ToggleCartHidden: Boolean!
    # AddItemToCart(item: Item!): [Item]!

  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;



export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    }
  }
};
