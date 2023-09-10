const loadAi = async (isShowAll) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const ai = data.data.tools;
    displayAi(ai, isShowAll);
    // console.log(ai);
}

const displayAi = (ai, isShowAll) => {
    const aiContainer = document.getElementById('ai-container');
    // console.log(ai);
    //clear  container cards before adding new cards
    aiContainer.textContent = '';
    //display show all button if there are more than 6 ai
    const showAllContainer = document.getElementById('show-all-container');
    if (ai.length > 6 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // display only first 6 ai if not show all
    if (!isShowAll) {
        ai = ai.slice(0, 6);
    }
    ai.forEach(a => {
        console.log(a);
        // 1. create a div
        const aiCard = document.createElement('div');
        aiCard.classList = `card bg-gray-100 text-center rounded-lg shadow-xl`;
        aiCard.innerHTML = `
        <figure><img class="h-60 w-96" src="${a.image}" alt="Not Found" /></figure>
                    <div class="card-body ">
                    <div class="items-start text-left">
                    <p class="text-xl font-semibold">Features:</p>
                    ${Object.values(a.features).length > 0
                       ? `<ol>${Object.values(a.features).map((feature, index) => `<li>${index + 1}. ${feature}</li>`).join('')}</ol>`
                       : 'Nothing found'}
                    </div>
                    <hr>
                    <p class="text-xl font-semibold items-start text-left">${a.name}</p>
                    <p class=" items-start text-left">${a.published_in}</p>
                        
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetails('${a.id}')" class="btn btn-primary mt-2">Show Details</button>
                        </div>
                    </div>
        `
        aiContainer.appendChild(aiCard);
    })
}
const handleShowDetails = async (id) => {
    // console.log('clicked details', id);
    //load single ai data
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const ai = data.data;
    showAiDetails(ai);
}

const showAiDetails = (ai) => {
    console.log(ai);
    // const aiName = document.getElementById('show-detail-phone-name');
    // aiName.innerText = ai.description;

    const showDetailContainer = document.getElementById('show-details-container');

    showDetailContainer.innerHTML = `
    <p>${ai.description}</p>
    
    <p class="text-xl font-semibold">Pricing:</p>
    <div>
    ${ai.pricing && ai.pricing.length > 0
            ? `<ul class="flex gap-8">${ai.pricing.map((plan, index) => `<li>${plan.plan}: ${plan.price}</li>`).join('')}</ul>`
            : 'Nothing found'}
    </div>
    <div class="flex flex-col-2 justify-between">
    <div>
        <p class="text-xl font-semibold">Features:</p>
        ${Object.values(ai.features).length > 0
            ? `<ol>${Object.values(ai.features).map((feature, index) => `<li>${index + 1}. ${feature.feature_name}</li>`).join('')}</ol>`
            : 'Nothing found'}
    </div>
    <div>
        <p class="text-xl font-semibold">Integrations:</p>
        ${ai.integrations && ai.integrations.length > 0
            ? `<ol>${Object.values(ai.integrations).map((integration, index) => `<li>${index + 1}. ${integration}</li>`).join('')}</ol>`
            : 'No integrations available'}
    </div>
    </div>

    `

    //show the modal
    show_details_modal.showModal();
}


//handle show all

const handleShowAll = () => {
    loadAi(true);
}
loadAi();