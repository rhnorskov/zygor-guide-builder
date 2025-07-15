local ZygorGuidesViewer = ZygorGuidesViewer 

if not ZygorGuidesViewer then 
    return
end 

ZygorGuidesViewer.GuideMenuTier = "CLA" 

ZygorGuidesViewer:RegisterGuide("Leveling\\Example Guide", {
    mopready = true, 
    description = "This is an example guide to demonstrate the structure.", 
}, [[
step
label "Welcome_Step"
Welcome to the guide! |tip Press 'Next' to continue.
step
This is an introduction to the guide.
|tip Make sure to read everything carefully.
]])