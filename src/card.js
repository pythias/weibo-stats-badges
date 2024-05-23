const { downloadImage } = require('./tool');

class Card {
    constructor() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.titleColor = '#FFF';
            this.subColor = '#AAB1C0';
            this.statsColor = '#C4C4C4';
            this.backgroundColor = '#363636';
        } else {
            this.titleColor = '#E79114';
            this.subColor = '#6A7C96';
            this.statsColor = '#363636';
            this.backgroundColor = '#FFF';
        }

        this.width = 360;
        this.height = 180;
        this.left = 10;
        this.titleTop = 35;
        this.bodyTop = 70;

        this.link = '';
        this.icon = '';
        this.stats = [];
    }

    setLink(link) {
        this.link = link;
    }

    setTitle(text) {
        this.title = text;
    }

    setSubTitle(text) {
        this.subTitle = text;
    }

    setIcon(icon) {
        this.icon = icon;
        this.icon = this.icon.replace(/currentColor/g, this.backgroundColor);
    }

    addStat(title, value, link = null) {
        if (typeof value === 'number' || /^\d+$/.test(value)) {
            if (value >= 10000) {
                value = (value / 10000).toFixed(1) + '万';
            }
        }

        this.stats.push({
            title: title,
            value: value,
            link: link,
        });
    }

    async setAvatar(avatar) {
        const downloaded = await downloadImage(avatar);
        this.avatar = `data:image/png;base64,${downloaded.toString('base64')}`;
    }

    renderStyle() {
        return `<style>
        .title {
            font: 600 18px ${this.font};
            fill: ${this.titleColor};
        }

        .sub-title {
            font: 600 12px ${this.font};
            fill: ${this.subColor};
        }

        .stat {
            font: 600 15px ${this.font};
            fill: ${this.statsColor};
            font-weight: 700;
        }
    </style>
        `;
    }

    renderStats() {
        let stats = '';
        let offset = 0;
        for (const stat of this.stats) {
            if (stat.link) {
                stats += `
                <a href="${stat.link}" target="_blank">
                    <g transform="translate(0, ${offset})">
                        <text class="stat" x="0" y="12.5">${stat.value}<tspan class="sub-title" dx="3">${stat.title}</tspan></text>
                    </g>
                </a>
                `;
            } else {
                stats += `
                <g transform="translate(0, ${offset})">
                    <text class="stat" x="0" y="12.5">${stat.value}<tspan class="sub-title" dx="3">${stat.title}</tspan></text>
                </g>
                `;
            }
            offset += 25;
        }

        return stats;
    }

    renderAvatar() {
        let avatarX = this.width - 80 - 10;
        let avatarY = (this.height - this.bodyTop) / 2;

        let avatar = `<g data-testid="card-avatar" transform="translate(${avatarX}, ${avatarY})">
        <defs>
            <clipPath id="avatarCircle">
                <circle cx="0" cy="0" r="40" />
            </clipPath>
        </defs>

        <image clip-path="url(#avatarCircle)" x="-40" y="-40" width="80" height="80" href="${this.avatar}" />

        <svg x="20" y="20" width="20" height="20">
            ${this.icon}
        </svg>
    </g>`;

        if (this.link) {
            return `<a href="${this.link}" target="_blank">
        ${avatar}
    </a>`;
        }

        return avatar;
    }

    render() {
        let style = this.renderStyle();
        let stats = this.renderStats();
        let avatar = this.renderAvatar();

        return `<svg width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
    ${style}

    <g data-testid="card-title" transform="translate(${this.left}, ${this.titleTop})">
        <a href="${this.link}" target="_blank">
            <g transform="translate(0, 0)">
                <text x="0" y="0" class="title" data-testid="card-header">${this.title}</text>
                <text class="stat" x="0" y="25">
                    <tspan class="sub-title" dx="0">${this.subTitle}</tspan>
                </text>
            </g>
        </a>
    </g>

    <g data-testid="card-body" transform="translate(0, ${this.bodyTop})">
        ${avatar}

        <svg x="${this.left}" y="10">
            ${stats}
        </svg>
    </g>
</svg>`;
    }
}

module.exports = Card;