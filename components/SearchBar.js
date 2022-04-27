import { Input } from "@chakra-ui/react";

const SearchBar = ({ ...rest }) => {
    return (
      <Input
        variant="outline"
        focusBorderColor="Lime"
        placeholder="Search"
        _placeholder={{ color: "inherit", opacity: 1 }}
        {...rest}
      />
    );
}

export default SearchBar;