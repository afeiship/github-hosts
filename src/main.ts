import '@/setup';
import dnsResolver from '@jswork/dns-resolver';
import clipboardy from 'clipboardy';

const GH_DOMAINS = [
  'github.com',
  'github.github.io',
  'assets-cdn.github.com',
  'github.global.ssl.fastly.net'
];

class App {
  public static async start() {
    const results: any[] = [];
    for (const item of GH_DOMAINS) {
      const result = await dnsResolver(item);
      results.push({
        domain: item,
        ip: nx.get(result, '[0].ip')
      });
    }

    const content = this.buildHosts(results);
    clipboardy.writeSync(content);
    console.log('🚀 hosts copied to clipboard!');
    console.log('🍒 result:\n', content, '\n');
  }

  public static buildHosts(inReulsts) {
    const hosts: string[] = ['\n# github hosts\n'];
    for (const item of inReulsts) {
      hosts.push(`${item.ip}      ${item.domain}`);
    }
    return hosts.join('\n');
  }
}

App.start();
