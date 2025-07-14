local ZygorGuidesViewer = ZygorGuidesViewer

ZygorGuidesViewer.GuideMenuTier = "CLA"

ZygorGuidesViewer:RegisterGuide("Leveling\\Simple Example", {
    mopready = true,
    description = "A simple example guide to show basic functionality.",
    condition_suggested = function()
        return UnitLevel("player") >= 1
    end
}, [[
step
Go to Stormwind City |goto Stormwind City/0 60,70
|tip This is the Trade District area of Stormwind.
|tip Look for the auction house and bank nearby.
step
talk Auctioneer Jaxon##15659
|tip Click on the auctioneer to open the auction house.
|tip You can buy and sell items here with other players.
step
Go to the Bank |goto Stormwind City/0 39.79,46.14
|tip The bank is just north of the auction house.
|tip You can store items safely in your bank vault.
step
talk Olivia Burnside##2455
|tip Talk to the banker to access your bank storage.
|tip Your bank has 28 free slots plus any bags you add.
step
You have completed the simple example guide!
|tip This guide showed you basic locations in Stormwind.
|tip You can now explore more complex guides in other categories.
]])
