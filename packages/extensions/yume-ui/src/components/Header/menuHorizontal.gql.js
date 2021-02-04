import { gql } from '@apollo/client';

export const GET_MENU_HORIZONTAL = gql`
    query GetMenuHorizontal($id: Int!) {
        category(id: $id) {
            id
            name
            children {
                children_count
                id
                include_in_menu
                name
                position
                url_path
                url_suffix
                children {
                    children_count
                    id
                    include_in_menu
                    name
                    position
                    url_path
                    url_suffix
                    children {
                        children_count
                        id
                        include_in_menu
                        name
                        position
                        url_path
                        url_suffix
                    }
                }
            }
        }
    }
`;
