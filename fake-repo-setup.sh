#!/bin/bash

ROOT=${DATAROOT:?Error dataroot not defined}

function exeter(){
    mkdir Exeter
    pushd Exeter || exit
    git init
    echo '*.L??' > .gitignore
    echo '*.zip' >> .gitignore
    echo 'Thumbs.db' >> .gitignore
    echo "Exeter Model" > README.md
    git commit -am "Initial Commit"
    cp "$ROOT/AlexSATURN/Alex Files/Exeter_Model/UE"/* .
    cp "$ROOT/AlexSATURN/Alex Files/Exeter_Model/CountSites.csv" .
    git add .
    git commit -m "Add User Equillibrium Model"
    for branch in OBA OBA_2016 OBA_Mobile ; do
        git checkout -b $branch
        cp "$ROOT/AlexSATURN/Alex Files/Exeter_Model/$branch"/* .
        git add .
        git commit -m "Add $branch Model"
    done
    git checkout master
    popd
echo "done"
}

function clyst_honiton(){
    mkdir ClystHoniton
    pushd ClystHoniton || exit
    git init
    echo '*.L??' > .gitignore
    echo '*.zip' >> .gitignore
    echo 'Thumbs.db' >> .gitignore
    echo "Clyst Honiton Test Network" > README.md
    git add .
    git commit -m "Modelsetup"
    cp "$ROOT/AlexSATURN/Alex Files/GIS/ClystHonitonTestNetwork"/*.* .
    git add -- *.DAT *.dat
    git commit -m "Initial model upload"
    git add -- *.sh? *.dbf
    git commit -m "Include shapefiles"
    git add .
    git commit -m "First run"
    popd
}

function exmouth() {
    mkdir Exmouth
    pushd Exmouth || exit
    git init
    echo '*.L??' > .gitignore
    echo '*.zip' >> .gitignore
    echo 'Thumbs.db' >> .gitignore
    echo "Exmouth Test Network" > README.md
    git add .
    git commit -m "Modelsetup"
    cp "$ROOT/AlexSATURN/Alex Files/GIS/ExemouthTestNetwork"/Exemouth_Network.* .
    cp "$ROOT/AlexSATURN/Alex Files/GIS/ExemouthTestNetwork"/Exemouth_Zones.* .
    cp "$ROOT/AlexSATURN/Alex Files/GIS/ExemouthTestNetwork"/Exemouth_Nodes.* .
    git add -- Exemouth_Network.dat
    git commit -m "Initial model upload"
    git add -- *.shp *.shx *.dbf
    git commit -m "GIS Files"
    git add -- .
    git commit -m "First run"
    for multiplier in x3 x5 ; do
        git checkout -b $multiplier-demand
        for file in  "$ROOT/AlexSATURN/Alex Files/GIS/ExemouthTestNetwork"/Exemouth_Network_${multiplier}Congestion.* ; do
            extension=${file##*.}
            cp -v "$file" "Exemouth_Network.$extension"
        done
        git add -- .
        git commit -m "Update GONZO demand factor for $multiplier"
        git checkout master
    done
    popd
}

exeter
clyst_honiton
exmouth


