interface WorkExperience {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
}

interface Education {
    id: string;
    degree: string;
    institution: string;
    year: string;
}

class ResumeBuilder {
    private workExperiences: WorkExperience[] = [];
    private educations: Education[] = [];
    private skills: string[] = [];
    private languages: string[] = [];

    constructor() {
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        document.getElementById('resumeForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateResume();
        });

        document.getElementById('addWorkExperience')?.addEventListener('click', () => this.addWorkExperience());
        document.getElementById('addEducation')?.addEventListener('click', () => this.addEducation());
        document.getElementById('addSkill')?.addEventListener('click', () => this.addSkill());
        document.getElementById('addLanguage')?.addEventListener('click', () => this.addLanguage());

        document.getElementById('profilePic')?.addEventListener('change', (e) => this.handleProfilePicChange(e));

        document.getElementById('printResume')?.addEventListener('click', () => {
            this.adjustContentForPrinting();
            window.print();
        });
        document.getElementById('editResume')?.addEventListener('click', () => this.editResume());
    }

    private handleProfilePicChange(e: Event): void {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('profilePreview') as HTMLImageElement;
                const resumeProfilePic = document.getElementById('resumeProfilePic') as HTMLImageElement;
                if (e.target?.result) {
                    preview.src = e.target.result as string;
                    resumeProfilePic.src = e.target.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    private addWorkExperience(): void {
        const id = `work-${Date.now()}`;
        const container = document.getElementById('workExperiences');
        const workExpDiv = document.createElement('div');
        workExpDiv.className = 'work-experience-item';
        workExpDiv.innerHTML = `
            <input type="text" class="company" placeholder="Company Name" required>
            <input type="text" class="position" placeholder="Position" required>
            <input type="text" class="duration" placeholder="Duration (e.g., 2020-2023)" required>
            <textarea class="description" placeholder="Job Description" required></textarea>
            <button type="button" class="delete-btn" onclick="resumeBuilder.deleteItem('${id}', 'work')">Delete</button>
        `;
        workExpDiv.id = id;
        container?.appendChild(workExpDiv);
    }

    private addEducation(): void {
        const id = `edu-${Date.now()}`;
        const container = document.getElementById('educations');
        const educationDiv = document.createElement('div');
        educationDiv.className = 'education-item';
        educationDiv.innerHTML = `
            <input type="text" class="degree" placeholder="Degree" required>
            <input type="text" class="institution" placeholder="Institution" required>
            <input type="text" class="year" placeholder="Year" required>
            <button type="button" class="delete-btn" onclick="resumeBuilder.deleteItem('${id}', 'education')">Delete</button>
        `;
        educationDiv.id = id;
        container?.appendChild(educationDiv);
    }

    private addSkill(): void {
        const input = document.getElementById('skillInput') as HTMLInputElement;
        const skill = input.value.trim();
        
        if (skill) {
            const id = `skill-${Date.now()}`;
            const container = document.getElementById('skills');
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item';
            skillDiv.innerHTML = `
                <span>${skill}</span>
                <button type="button" class="delete-btn" onclick="resumeBuilder.deleteItem('${id}', 'skill')">Delete</button>
            `;
            skillDiv.id = id;
            container?.appendChild(skillDiv);
            input.value = '';
        }
    }

    private addLanguage(): void {
        const input = document.getElementById('languageInput') as HTMLInputElement;
        const language = input.value.trim();
        
        if (language) {
            const id = `lang-${Date.now()}`;
            const container = document.getElementById('languages');
            const languageDiv = document.createElement('div');
            languageDiv.className = 'language-item';
            languageDiv.innerHTML = `
                <span>${language}</span>
                <button type="button" class="delete-btn" onclick="resumeBuilder.deleteItem('${id}', 'language')">Delete</button>
            `;
            languageDiv.id = id;
            container?.appendChild(languageDiv);
            input.value = '';
        }
    }

    private generateResume(): void {
        const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
        const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
        const profile = (document.getElementById('profile') as HTMLTextAreaElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
     
        const address = (document.getElementById('address') as HTMLInputElement).value;

        document.getElementById('resumeName')!.textContent = fullName;
        document.getElementById('resumeTitle')!.textContent = jobTitle;
        document.getElementById('resumeProfile')!.textContent = profile;

        const contactInfo = document.querySelector('.contact-info')!;
        contactInfo.innerHTML = `
            <div><i class="fas fa-phone"></i>${phone}</div>
            <div><i class="fas fa-envelope"></i>${email}</div>
          
            ${address ? `<div><i class="fas fa-map-marker-alt"></i>${address}</div>` : ''}
        `;

        this.updateWorkExperience();
        this.updateEducation();
        this.updateSkills();
        this.updateLanguages();

        document.getElementById('resumeOutput')?.classList.remove('hidden');
        this.adjustContentForPrinting();
    }

    private updateWorkExperience(): void {
        const workExpContainer = document.getElementById('resumeWorkExperience')!;
        workExpContainer.innerHTML = '';
        
        document.querySelectorAll('.work-experience-item').forEach(item => {
            const company = (item.querySelector('.company') as HTMLInputElement).value;
            const position = (item.querySelector('.position') as HTMLInputElement).value;
            const duration = (item.querySelector('.duration') as HTMLInputElement).value;
            const description = (item.querySelector('.description') as HTMLTextAreaElement).value;
            
            const workItem = document.createElement('div');
            workItem.className = 'work-item';
            workItem.innerHTML = `
                <h3>${position} at ${company}</h3>
                <div class="duration">${duration}</div>
                <p>${description}</p>
            `;
            workExpContainer.appendChild(workItem);
        });
    }

    private updateEducation(): void {
        const eduContainer = document.getElementById('resumeEducation')!;
        eduContainer.innerHTML = '';
        
        document.querySelectorAll('.education-item').forEach(item => {
            const degree = (item.querySelector('.degree') as HTMLInputElement).value;
            const institution = (item.querySelector('.institution') as HTMLInputElement).value;
            const year = (item.querySelector('.year') as HTMLInputElement).value;
            
            const eduItem = document.createElement('div');
            eduItem.className = 'education-item';
            eduItem.innerHTML = `
                <h3>${degree}</h3>
                <p>${institution}</p>
                <div class="year">${year}</div>
            `;
            eduContainer.appendChild(eduItem);
        });
    }

    private updateSkills(): void {
        const skillsContainer = document.getElementById('resumeSkills')!;
        skillsContainer.innerHTML = '';
        
        document.querySelectorAll('.skill-item').forEach(item => {
            const skill = item.querySelector('span')!.textContent;
            const li = document.createElement('li');
            li.textContent = skill;
            skillsContainer.appendChild(li);
        });
    }

    private updateLanguages(): void {
        const languagesContainer = document.getElementById('resumeLanguages')!;
        languagesContainer.innerHTML = '';
        
        document.querySelectorAll('.language-item').forEach(item => {
            const language = item.querySelector('span')!.textContent;
            const li = document.createElement('li');
            li.textContent = language;
            languagesContainer.appendChild(li);
        });
    }

    public deleteItem(id: string, type: string): void {
        const item = document.getElementById(id);
        if (item && confirm('Are you sure you want to delete this item?')) {
            item.remove();
        }
    }

    private editResume(): void {
        document.getElementById('resumeOutput')?.classList.add('hidden');
        this.populateFormWithExistingData();
    }

    private populateFormWithExistingData(): void {
        (document.getElementById('fullName') as HTMLInputElement).value = document.getElementById('resumeName')!.textContent || '';
        (document.getElementById('jobTitle') as HTMLInputElement).value = document.getElementById('resumeTitle')!.textContent || '';
        (document.getElementById('profile') as HTMLTextAreaElement).value = document.getElementById('resumeProfile')!.textContent || '';

        const contactInfo = document.querySelector('.contact-info')!;
        (document.getElementById('phone') as HTMLInputElement).value = contactInfo.querySelector('.fa-phone')?.nextSibling?.textContent || '';
        (document.getElementById('email') as HTMLInputElement).value = contactInfo.querySelector('.fa-envelope')?.nextSibling?.textContent || '';

        (document.getElementById('address') as HTMLInputElement).value = contactInfo.querySelector('.fa-map-marker-alt')?.nextSibling?.textContent || '';

        this.populateWorkExperience();
        this.populateEducation();
        this.populateSkills();
        this.populateLanguages();
    }

    private populateWorkExperience(): void {
        const workExpContainer = document.getElementById('workExperiences')!;
        workExpContainer.innerHTML = '';
        document.querySelectorAll('#resumeWorkExperience .work-item').forEach((item, index) => {
            const id = `work-${Date.now()}-${index}`;
            const workExpDiv = document.createElement('div');
            workExpDiv.className = 'work-experience-item';
            workExpDiv.id = id;
            workExpDiv.innerHTML = `
                <input type="text" class="company" placeholder="Company Name" value="${item.querySelector('h3')?.textContent?.split(' at ')[1] || ''}" required>
                <input type="text" class="position" placeholder="Position" value="${item.querySelector('h3')?.textContent?.split(' at ')[0] || ''}" required>
                <input type="text" class="duration" placeholder="Duration" value="${item.querySelector('.duration')?.textContent || ''}" required>
                <textarea class="description" placeholder="Job Description" required>${item.querySelector('p')?.textContent || ''}</textarea>
                <button type="button" class="delete-btn" onclick="resumeBuilder.deleteItem('${id}', 'work')">Delete</button>
            `;
            workExpContainer.appendChild(workExpDiv);
        });
    }

    private populateEducation(): void {
        const educationContainer = document.getElementById('educations')!;
        educationContainer.innerHTML = '';
        document.querySelectorAll('#resumeEducation .education-item').forEach((item, index) => {
            const id = `edu-${Date.now()}-${index}`;
            const educationDiv = document.createElement('div');
            educationDiv.className = 'education-item';
            educationDiv.id = id;
            educationDiv.innerHTML = `
                <input type="text" class="degree" placeholder="Degree" value="${item.querySelector('h3')?.textContent || ''}" required>
                <input type="text" class="institution" placeholder="Institution" value="${item.querySelector('p')?.textContent || ''}" required>
                <input type="text" class="year" placeholder="Year" value="${item.querySelector('.year')?.textContent || ''}" required>
                <button type="button" class="delete-btn" onclick="resumeBuilder.deleteItem('${id}', 'education')">Delete</button>
            `;
            educationContainer.appendChild(educationDiv);
        });
    }

    private populateSkills(): void {
        const skillsContainer = document.getElementById('skills')!;
        skillsContainer.innerHTML = '';
        document.querySelectorAll('#resumeSkills li').forEach((item, index) => {
            const id = `skill-${Date.now()}-${index}`;
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item';
            skillDiv.id = id;
            skillDiv.innerHTML = `
                <span>${item.textContent}</span>
                <button type="button" class="delete-btn" onclick="resumeBuilder.deleteItem('${id}', 'skill')">Delete</button>
            `;
            skillsContainer.appendChild(skillDiv);
        });
    }

    private populateLanguages(): void {
        const languagesContainer = document.getElementById('languages')!;
        languagesContainer.innerHTML = '';
        document.querySelectorAll('#resumeLanguages li').forEach((item, index) => {
            const id = `lang-${Date.now()}-${index}`;
            const languageDiv = document.createElement('div');
            languageDiv.className = 'language-item';
            languageDiv.id = id;
            languageDiv.innerHTML = `
                <span>${item.textContent}</span>
                <button type="button" class="delete-btn" onclick="resumeBuilder.deleteItem('${id}', 'language')">Delete</button>
            `;
            languagesContainer.appendChild(languageDiv);
        });
    }

    private adjustContentForPrinting(): void {
        const container = document.querySelector('.resume-container') as HTMLElement;
        const originalFontSize = parseFloat(getComputedStyle(container).fontSize);
        let fontSize = originalFontSize;
        const minFontSize = 7;

        while (container.scrollHeight > container.clientHeight && fontSize > minFontSize) {
            fontSize -= 0.5;
            container.style.fontSize = `${fontSize}px`;
        }

        if (container.scrollHeight > container.clientHeight) {
            const warning = document.createElement('div');
            warning.className = 'print-only';
            warning.style.color = 'red';
            warning.style.textAlign = 'center';
            warning.style.padding = '10px';
  
            container.insertBefore(warning, container.firstChild);
        }
    }
}

const resumeBuilder = new ResumeBuilder();
(window as any).resumeBuilder = resumeBuilder;