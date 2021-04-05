pragma solidity >=0.4.21 <0.6.0;

import { BitlandProperty } from "./ERC721Mintable.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import "./Verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

/*interface Verifier {
    function verifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c, uint[2] memory input
        ) public view returns (bool r);
}*/

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is BitlandProperty {

    using SafeMath for uint256;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address client;
    }
    // TODO define an array of the above struct
    Solution[] private Solutions;
    address private _owner;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolutions;
    string constant private TOKEN_URI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    // Verifier contract
    Verifier VerifierContract;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address client);
    event Minted(address to, uint256 tokenId);

    // modifiers
    modifier onlyOwner () {
        require(msg.sender == _owner, "ONLY OWNER CAN CALL THIS FUNCTION!");
        _;
    }

    constructor (string memory name, string memory symbol) public BitlandProperty(name, symbol) {
        _owner = msg.sender;
        //Solutions = new Solution[](0); // causing storage to memory copy error
        VerifierContract = new Verifier();
    }

    // TODO Create a function to add the solutions to the array and emit the event
    /***
    * @dev add solution to solutions
    * @param index token id
    * @param clientAddress address of client who wants to mint
    */
    function addSolution(uint256 index, address clientAddress) internal {
        Solution memory solution = Solution({
            index: index,
            client: clientAddress
        });
        Solutions.push(solution);
        bytes32 key = keccak256(abi.encodePacked(index, clientAddress));
        uniqueSolutions[key] = solution;

        emit SolutionAdded(index, clientAddress);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    /**
    * @dev mint new NFT only after verifying solution
    *
    * */
    function mintOne(
                address to, 
                uint256 tokenId,
                uint[2] calldata a,
                uint[2][2] calldata b,
                uint[2] calldata c, 
                uint[2] calldata input
                ) external onlyOwner {
        bytes32 key = keccak256(abi.encodePacked(tokenId, to));
        require(uniqueSolutions[key].client == address(0), "SOLN SQUARE MINT: SOLUTION ALREADY EXISTS!");
        require(VerifierContract.verifyTx(a, b, c, input), "SOLN SQUARE MINT: WRONG VERIFICATION!");
        addSolution(tokenId, to);
        
        super.mint(to, tokenId, TOKEN_URI);

        emit Minted(to, tokenId);
    }
}






















  


























