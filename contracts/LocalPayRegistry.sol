// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title LocalPayRegistry
 * @dev Registry contract for LocalPay drivers and supported tokens
 */
contract LocalPayRegistry is Ownable {
    // Struct to store driver information
    struct Driver {
        address wallet;
        string name;
        bool active;
        uint256 registrationDate;
        uint256 totalTrips;
        uint256 totalEarnings;
    }

    // Mapping of driver addresses to their information
    mapping(address => Driver) public drivers;
    
    // Array to store all driver addresses
    address[] public driverAddresses;
    
    // Mapping of supported token addresses
    mapping(address => bool) public supportedTokens;
    
    // Events
    event DriverRegistered(address indexed wallet, string name);
    event DriverDeactivated(address indexed wallet);
    event DriverReactivated(address indexed wallet);
    event TokenAdded(address indexed token);
    event TokenRemoved(address indexed token);
    event TripCompleted(address indexed driver, address indexed token, uint256 amount);

    constructor() {
        // Add initial supported tokens (Mento stablecoins on Alfajores)
        supportedTokens[0x765DE816845861e75A25fCA122bb6898B8B1282a] = true; // cUSD
        supportedTokens[0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F] = true; // cEUR
        supportedTokens[0xE4D517785D091D3c54818832dB6094bcc2744545] = true; // cREAL
    }

    /**
     * @dev Register a new driver
     * @param name Driver's name or identifier
     */
    function registerDriver(string memory name) external {
        require(!drivers[msg.sender].active, "Driver already registered");
        
        drivers[msg.sender] = Driver({
            wallet: msg.sender,
            name: name,
            active: true,
            registrationDate: block.timestamp,
            totalTrips: 0,
            totalEarnings: 0
        });
        
        driverAddresses.push(msg.sender);
        emit DriverRegistered(msg.sender, name);
    }

    /**
     * @dev Deactivate a driver
     */
    function deactivateDriver() external {
        require(drivers[msg.sender].active, "Driver not active");
        drivers[msg.sender].active = false;
        emit DriverDeactivated(msg.sender);
    }

    /**
     * @dev Reactivate a driver
     */
    function reactivateDriver() external {
        require(!drivers[msg.sender].active, "Driver already active");
        require(drivers[msg.sender].wallet != address(0), "Driver not registered");
        drivers[msg.sender].active = true;
        emit DriverReactivated(msg.sender);
    }

    /**
     * @dev Add a supported token (admin only)
     * @param token Address of the token to add
     */
    function addSupportedToken(address token) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(!supportedTokens[token], "Token already supported");
        supportedTokens[token] = true;
        emit TokenAdded(token);
    }

    /**
     * @dev Remove a supported token (admin only)
     * @param token Address of the token to remove
     */
    function removeSupportedToken(address token) external onlyOwner {
        require(supportedTokens[token], "Token not supported");
        supportedTokens[token] = false;
        emit TokenRemoved(token);
    }

    /**
     * @dev Record a completed trip
     * @param token Address of the token used for payment
     * @param amount Amount paid for the trip
     */
    function recordTrip(address token, uint256 amount) external {
        require(drivers[msg.sender].active, "Driver not active");
        require(supportedTokens[token], "Token not supported");
        
        drivers[msg.sender].totalTrips += 1;
        drivers[msg.sender].totalEarnings += amount;
        
        emit TripCompleted(msg.sender, token, amount);
    }

    /**
     * @dev Get driver information
     * @param driver Address of the driver
     */
    function getDriver(address driver) external view returns (Driver memory) {
        return drivers[driver];
    }

    /**
     * @dev Get all registered drivers
     */
    function getAllDrivers() external view returns (address[] memory) {
        return driverAddresses;
    }

    /**
     * @dev Check if a token is supported
     * @param token Address of the token to check
     */
    function isTokenSupported(address token) external view returns (bool) {
        return supportedTokens[token];
    }
}