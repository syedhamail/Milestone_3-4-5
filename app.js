var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.workExperiences = [];
        this.educations = [];
        this.skills = [];
        this.languages = [];
        this.initializeEventListeners();
    }
    ResumeBuilder.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
            e.preventDefault();
            _this.generateResume();
        });
        (_b = document.getElementById('addWorkExperience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.addWorkExperience(); });
        (_c = document.getElementById('addEducation')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.addEducation(); });
        (_d = document.getElementById('addSkill')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return _this.addSkill(); });
        (_e = document.getElementById('addLanguage')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return _this.addLanguage(); });
        (_f = document.getElementById('profilePic')) === null || _f === void 0 ? void 0 : _f.addEventListener('change', function (e) { return _this.handleProfilePicChange(e); });
        (_g = document.getElementById('printResume')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function () {
            _this.adjustContentForPrinting();
            window.print();
        });
        (_h = document.getElementById('editResume')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', function () { return _this.editResume(); });
    };
    ResumeBuilder.prototype.handleProfilePicChange = function (e) {
        var _a;
        var input = e.target;
        var file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var preview = document.getElementById('profilePreview');
                var resumeProfilePic = document.getElementById('resumeProfilePic');
                if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                    preview.src = e.target.result;
                    resumeProfilePic.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };
    ResumeBuilder.prototype.addWorkExperience = function () {
        var id = "work-".concat(Date.now());
        var container = document.getElementById('workExperiences');
        var workExpDiv = document.createElement('div');
        workExpDiv.className = 'work-experience-item';
        workExpDiv.innerHTML = "\n            <input type=\"text\" class=\"company\" placeholder=\"Company Name\" required>\n            <input type=\"text\" class=\"position\" placeholder=\"Position\" required>\n            <input type=\"text\" class=\"duration\" placeholder=\"Duration (e.g., 2020-2023)\" required>\n            <textarea class=\"description\" placeholder=\"Job Description\" required></textarea>\n            <button type=\"button\" class=\"delete-btn\" onclick=\"resumeBuilder.deleteItem('".concat(id, "', 'work')\">Delete</button>\n        ");
        workExpDiv.id = id;
        container === null || container === void 0 ? void 0 : container.appendChild(workExpDiv);
    };
    ResumeBuilder.prototype.addEducation = function () {
        var id = "edu-".concat(Date.now());
        var container = document.getElementById('educations');
        var educationDiv = document.createElement('div');
        educationDiv.className = 'education-item';
        educationDiv.innerHTML = "\n            <input type=\"text\" class=\"degree\" placeholder=\"Degree\" required>\n            <input type=\"text\" class=\"institution\" placeholder=\"Institution\" required>\n            <input type=\"text\" class=\"year\" placeholder=\"Year\" required>\n            <button type=\"button\" class=\"delete-btn\" onclick=\"resumeBuilder.deleteItem('".concat(id, "', 'education')\">Delete</button>\n        ");
        educationDiv.id = id;
        container === null || container === void 0 ? void 0 : container.appendChild(educationDiv);
    };
    ResumeBuilder.prototype.addSkill = function () {
        var input = document.getElementById('skillInput');
        var skill = input.value.trim();
        if (skill) {
            var id = "skill-".concat(Date.now());
            var container = document.getElementById('skills');
            var skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item';
            skillDiv.innerHTML = "\n                <span>".concat(skill, "</span>\n                <button type=\"button\" class=\"delete-btn\" onclick=\"resumeBuilder.deleteItem('").concat(id, "', 'skill')\">Delete</button>\n            ");
            skillDiv.id = id;
            container === null || container === void 0 ? void 0 : container.appendChild(skillDiv);
            input.value = '';
        }
    };
    ResumeBuilder.prototype.addLanguage = function () {
        var input = document.getElementById('languageInput');
        var language = input.value.trim();
        if (language) {
            var id = "lang-".concat(Date.now());
            var container = document.getElementById('languages');
            var languageDiv = document.createElement('div');
            languageDiv.className = 'language-item';
            languageDiv.innerHTML = "\n                <span>".concat(language, "</span>\n                <button type=\"button\" class=\"delete-btn\" onclick=\"resumeBuilder.deleteItem('").concat(id, "', 'language')\">Delete</button>\n            ");
            languageDiv.id = id;
            container === null || container === void 0 ? void 0 : container.appendChild(languageDiv);
            input.value = '';
        }
    };
    ResumeBuilder.prototype.generateResume = function () {
        var _a;
        var fullName = document.getElementById('fullName').value;
        var jobTitle = document.getElementById('jobTitle').value;
        var profile = document.getElementById('profile').value;
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;
        var address = document.getElementById('address').value;
        document.getElementById('resumeName').textContent = fullName;
        document.getElementById('resumeTitle').textContent = jobTitle;
        document.getElementById('resumeProfile').textContent = profile;
        var contactInfo = document.querySelector('.contact-info');
        contactInfo.innerHTML = "\n            <div><i class=\"fas fa-phone\"></i>".concat(phone, "</div>\n            <div><i class=\"fas fa-envelope\"></i>").concat(email, "</div>\n          \n            ").concat(address ? "<div><i class=\"fas fa-map-marker-alt\"></i>".concat(address, "</div>") : '', "\n        ");
        this.updateWorkExperience();
        this.updateEducation();
        this.updateSkills();
        this.updateLanguages();
        (_a = document.getElementById('resumeOutput')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        this.adjustContentForPrinting();
    };
    ResumeBuilder.prototype.updateWorkExperience = function () {
        var workExpContainer = document.getElementById('resumeWorkExperience');
        workExpContainer.innerHTML = '';
        document.querySelectorAll('.work-experience-item').forEach(function (item) {
            var company = item.querySelector('.company').value;
            var position = item.querySelector('.position').value;
            var duration = item.querySelector('.duration').value;
            var description = item.querySelector('.description').value;
            var workItem = document.createElement('div');
            workItem.className = 'work-item';
            workItem.innerHTML = "\n                <h3>".concat(position, " at ").concat(company, "</h3>\n                <div class=\"duration\">").concat(duration, "</div>\n                <p>").concat(description, "</p>\n            ");
            workExpContainer.appendChild(workItem);
        });
    };
    ResumeBuilder.prototype.updateEducation = function () {
        var eduContainer = document.getElementById('resumeEducation');
        eduContainer.innerHTML = '';
        document.querySelectorAll('.education-item').forEach(function (item) {
            var degree = item.querySelector('.degree').value;
            var institution = item.querySelector('.institution').value;
            var year = item.querySelector('.year').value;
            var eduItem = document.createElement('div');
            eduItem.className = 'education-item';
            eduItem.innerHTML = "\n                <h3>".concat(degree, "</h3>\n                <p>").concat(institution, "</p>\n                <div class=\"year\">").concat(year, "</div>\n            ");
            eduContainer.appendChild(eduItem);
        });
    };
    ResumeBuilder.prototype.updateSkills = function () {
        var skillsContainer = document.getElementById('resumeSkills');
        skillsContainer.innerHTML = '';
        document.querySelectorAll('.skill-item').forEach(function (item) {
            var skill = item.querySelector('span').textContent;
            var li = document.createElement('li');
            li.textContent = skill;
            skillsContainer.appendChild(li);
        });
    };
    ResumeBuilder.prototype.updateLanguages = function () {
        var languagesContainer = document.getElementById('resumeLanguages');
        languagesContainer.innerHTML = '';
        document.querySelectorAll('.language-item').forEach(function (item) {
            var language = item.querySelector('span').textContent;
            var li = document.createElement('li');
            li.textContent = language;
            languagesContainer.appendChild(li);
        });
    };
    ResumeBuilder.prototype.deleteItem = function (id, type) {
        var item = document.getElementById(id);
        if (item && confirm('Are you sure you want to delete this item?')) {
            item.remove();
        }
    };
    ResumeBuilder.prototype.editResume = function () {
        var _a;
        (_a = document.getElementById('resumeOutput')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        this.populateFormWithExistingData();
    };
    ResumeBuilder.prototype.populateFormWithExistingData = function () {
        var _a, _b, _c, _d, _e, _f;
        document.getElementById('fullName').value = document.getElementById('resumeName').textContent || '';
        document.getElementById('jobTitle').value = document.getElementById('resumeTitle').textContent || '';
        document.getElementById('profile').value = document.getElementById('resumeProfile').textContent || '';
        var contactInfo = document.querySelector('.contact-info');
        document.getElementById('phone').value = ((_b = (_a = contactInfo.querySelector('.fa-phone')) === null || _a === void 0 ? void 0 : _a.nextSibling) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        document.getElementById('email').value = ((_d = (_c = contactInfo.querySelector('.fa-envelope')) === null || _c === void 0 ? void 0 : _c.nextSibling) === null || _d === void 0 ? void 0 : _d.textContent) || '';
        document.getElementById('address').value = ((_f = (_e = contactInfo.querySelector('.fa-map-marker-alt')) === null || _e === void 0 ? void 0 : _e.nextSibling) === null || _f === void 0 ? void 0 : _f.textContent) || '';
        this.populateWorkExperience();
        this.populateEducation();
        this.populateSkills();
        this.populateLanguages();
    };
    ResumeBuilder.prototype.populateWorkExperience = function () {
        var workExpContainer = document.getElementById('workExperiences');
        workExpContainer.innerHTML = '';
        document.querySelectorAll('#resumeWorkExperience .work-item').forEach(function (item, index) {
            var _a, _b, _c, _d, _e, _f;
            var id = "work-".concat(Date.now(), "-").concat(index);
            var workExpDiv = document.createElement('div');
            workExpDiv.className = 'work-experience-item';
            workExpDiv.id = id;
            workExpDiv.innerHTML = "\n                <input type=\"text\" class=\"company\" placeholder=\"Company Name\" value=\"".concat(((_b = (_a = item.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.split(' at ')[1]) || '', "\" required>\n                <input type=\"text\" class=\"position\" placeholder=\"Position\" value=\"").concat(((_d = (_c = item.querySelector('h3')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.split(' at ')[0]) || '', "\" required>\n                <input type=\"text\" class=\"duration\" placeholder=\"Duration\" value=\"").concat(((_e = item.querySelector('.duration')) === null || _e === void 0 ? void 0 : _e.textContent) || '', "\" required>\n                <textarea class=\"description\" placeholder=\"Job Description\" required>").concat(((_f = item.querySelector('p')) === null || _f === void 0 ? void 0 : _f.textContent) || '', "</textarea>\n                <button type=\"button\" class=\"delete-btn\" onclick=\"resumeBuilder.deleteItem('").concat(id, "', 'work')\">Delete</button>\n            ");
            workExpContainer.appendChild(workExpDiv);
        });
    };
    ResumeBuilder.prototype.populateEducation = function () {
        var educationContainer = document.getElementById('educations');
        educationContainer.innerHTML = '';
        document.querySelectorAll('#resumeEducation .education-item').forEach(function (item, index) {
            var _a, _b, _c;
            var id = "edu-".concat(Date.now(), "-").concat(index);
            var educationDiv = document.createElement('div');
            educationDiv.className = 'education-item';
            educationDiv.id = id;
            educationDiv.innerHTML = "\n                <input type=\"text\" class=\"degree\" placeholder=\"Degree\" value=\"".concat(((_a = item.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) || '', "\" required>\n                <input type=\"text\" class=\"institution\" placeholder=\"Institution\" value=\"").concat(((_b = item.querySelector('p')) === null || _b === void 0 ? void 0 : _b.textContent) || '', "\" required>\n                <input type=\"text\" class=\"year\" placeholder=\"Year\" value=\"").concat(((_c = item.querySelector('.year')) === null || _c === void 0 ? void 0 : _c.textContent) || '', "\" required>\n                <button type=\"button\" class=\"delete-btn\" onclick=\"resumeBuilder.deleteItem('").concat(id, "', 'education')\">Delete</button>\n            ");
            educationContainer.appendChild(educationDiv);
        });
    };
    ResumeBuilder.prototype.populateSkills = function () {
        var skillsContainer = document.getElementById('skills');
        skillsContainer.innerHTML = '';
        document.querySelectorAll('#resumeSkills li').forEach(function (item, index) {
            var id = "skill-".concat(Date.now(), "-").concat(index);
            var skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item';
            skillDiv.id = id;
            skillDiv.innerHTML = "\n                <span>".concat(item.textContent, "</span>\n                <button type=\"button\" class=\"delete-btn\" onclick=\"resumeBuilder.deleteItem('").concat(id, "', 'skill')\">Delete</button>\n            ");
            skillsContainer.appendChild(skillDiv);
        });
    };
    ResumeBuilder.prototype.populateLanguages = function () {
        var languagesContainer = document.getElementById('languages');
        languagesContainer.innerHTML = '';
        document.querySelectorAll('#resumeLanguages li').forEach(function (item, index) {
            var id = "lang-".concat(Date.now(), "-").concat(index);
            var languageDiv = document.createElement('div');
            languageDiv.className = 'language-item';
            languageDiv.id = id;
            languageDiv.innerHTML = "\n                <span>".concat(item.textContent, "</span>\n                <button type=\"button\" class=\"delete-btn\" onclick=\"resumeBuilder.deleteItem('").concat(id, "', 'language')\">Delete</button>\n            ");
            languagesContainer.appendChild(languageDiv);
        });
    };
    ResumeBuilder.prototype.adjustContentForPrinting = function () {
        var container = document.querySelector('.resume-container');
        var originalFontSize = parseFloat(getComputedStyle(container).fontSize);
        var fontSize = originalFontSize;
        var minFontSize = 7;
        while (container.scrollHeight > container.clientHeight && fontSize > minFontSize) {
            fontSize -= 0.5;
            container.style.fontSize = "".concat(fontSize, "px");
        }
        if (container.scrollHeight > container.clientHeight) {
            var warning = document.createElement('div');
            warning.className = 'print-only';
            warning.style.color = 'red';
            warning.style.textAlign = 'center';
            warning.style.padding = '10px';
            container.insertBefore(warning, container.firstChild);
        }
    };
    return ResumeBuilder;
}());
var resumeBuilder = new ResumeBuilder();
window.resumeBuilder = resumeBuilder;
