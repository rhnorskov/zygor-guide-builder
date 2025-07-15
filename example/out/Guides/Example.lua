local ZygorGuidesViewer = ZygorGuidesViewer 

if not ZygorGuidesViewer then 
    return
end 

ZygorGuidesViewer.GuideMenuTier = "CLA" 

ZygorGuidesViewer:RegisterGuide("Leveling\\Example Guide", {
    mopready = true, 
    description = "This is an example guide to demonstrate the structure.", 
}, [[
Welcome to the guide! |tip Press &#39;Next&#39; to continue.
This is an introduction to the guide.
|tip Make sure to read everything carefully.
]])