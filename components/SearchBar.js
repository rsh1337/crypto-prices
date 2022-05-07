import { SearchIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SearchBar() {
    const router = useRouter();
    const { terms } = router.query;
    const [text, setText] = useState("");
  
    useEffect(() => {
      setText(terms || "");
    }, [terms]);
  
    const handleSearch = (event) => {
      event.preventDefault();
      if (text !== terms) {
        router.push(`/search/?terms=${text}`, undefined, { shallow: true });
      }
    };
  
    return (
      <InputGroup as="form" onSubmit={handleSearch}>
        <Input
          variant="outline"
          focusBorderColor="Lime"
          placeholder="Search"
          _placeholder={{ color: "inherit", opacity: 1 }}
          value={text}
          onChange={(event) => setText(event.target.value)}
          htmlSize={30}
          width='auto'
        />
        <InputRightElement>
          <IconButton
            aria-label="Search for a coin"
            icon={<SearchIcon />}
            type="submit"
          />
        </InputRightElement>
      </InputGroup>
    );
  }
export default SearchBar;